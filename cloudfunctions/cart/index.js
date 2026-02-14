// 购物车云函数
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

/**
 * 购物车操作
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { OPENID } = wxContext
  const { action, product_id, quantity, cart_id } = event

  try {
    const cartCollection = db.collection('cart')

    if (action === 'list') {
      // 获取购物车列表
      const { data } = await cartCollection
        .where({ openid: OPENID })
        .get()

      // 获取商品详情
      const product_ids = data.map(item => item.product_id)
      const { data: products } = await db.collection('products')
        .where({
          _id: _.in(product_ids)
        })
        .get()

      const productsMap = {}
      products.forEach(p => {
        productsMap[p._id] = p
      })

      // 合并数据
      const result = data.map(item => {
        const product = productsMap[item.product_id]
        return {
          ...item,
          product_name: product ? product.name : '',
          product_image: product ? product.images[0] : '',
          price: product ? product.price : 0
        }
      })

      return {
        code: 0,
        data: result
      }
    }

    if (action === 'add') {
      // 添加到购物车
      const { data: existing } = await cartCollection
        .where({
          openid: OPENID,
          product_id
        })
        .get()

      if (existing.length > 0) {
        // 更新数量
        await cartCollection.doc(existing[0]._id).update({
          data: {
            quantity: existing[0].quantity + (quantity || 1)
          }
        })
      } else {
        // 添加新项
        await cartCollection.add({
          data: {
            openid: OPENID,
            product_id,
            quantity: quantity || 1,
            created_at: db.serverDate(),
            updated_at: db.serverDate()
          }
        })
      }

      return {
        code: 0,
        message: '添加成功'
      }
    }

    if (action === 'update') {
      // 更新购物车
      await cartCollection.doc(cart_id).update({
        data: {
          quantity,
          updated_at: db.serverDate()
        }
      })

      return {
        code: 0,
        message: '更新成功'
      }
    }

    if (action === 'delete') {
      // 删除购物车项
      await cartCollection.doc(cart_id).remove()

      return {
        code: 0,
        message: '删除成功'
      }
    }

    return {
      code: -1,
      message: '未知操作'
    }
  } catch (error) {
    console.error('操作失败:', error)
    return {
      code: -1,
      message: error.message || '操作失败'
    }
  }
}
