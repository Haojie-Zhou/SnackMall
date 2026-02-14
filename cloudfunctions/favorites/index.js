// 收藏功能云函数
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

/**
 * 收藏操作
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { OPENID } = wxContext
  const { action, product_id } = event

  try {
    const favoritesCollection = db.collection('favorites')

    if (action === 'list') {
      // 获取收藏列表
      const { data } = await favoritesCollection
        .where({ openid: OPENID })
        .get()

      // 获取商品详情
      const product_ids = data.map(item => item.product_id)
      const { data: products } = await db.collection('products')
        .where({
          _id: _.in(product_ids),
          is_active: true
        })
        .get()

      return {
        code: 0,
        data: products
      }
    }

    if (action === 'add') {
      // 添加收藏
      const { data: existing } = await favoritesCollection
        .where({
          openid: OPENID,
          product_id
        })
        .get()

      if (existing.length > 0) {
        return {
          code: -1,
          message: '已收藏该商品'
        }
      }

      await favoritesCollection.add({
        data: {
          openid: OPENID,
          product_id,
          created_at: db.serverDate()
        }
      })

      return {
        code: 0,
        message: '收藏成功'
      }
    }

    if (action === 'delete') {
      // 取消收藏
      const { data } = await favoritesCollection
        .where({
          openid: OPENID,
          product_id
        })
        .remove()

      return {
        code: 0,
        message: '取消收藏成功'
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
