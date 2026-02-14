// 订单管理云函数
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

/**
 * 生成订单号
 */
function generateOrderNo() {
  const timestamp = new Date().getTime()
  const random = Math.floor(Math.random() * 10000)
  return `ORDER${timestamp}${random}`
}

/**
 * 订单操作
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { OPENID } = wxContext
  const { action, items, address_id, order_id, status } = event

  try {
    const ordersCollection = db.collection('orders')

    if (action === 'create') {
      // 创建订单
      // 获取地址信息
      const { data: addresses } = await db.collection('addresses')
        .where({
          _id: address_id,
          openid: OPENID
        })
        .get()

      if (addresses.length === 0) {
        return {
          code: -1,
          message: '收货地址不存在'
        }
      }

      const address = addresses[0]

      // 计算总金额
      const product_ids = items.map(item => item.product_id)
      const { data: products } = await db.collection('products')
        .where({
          _id: _.in(product_ids)
        })
        .get()

      const productsMap = {}
      products.forEach(p => {
        productsMap[p._id] = p
      })

      let total_amount = 0
      const orderItems = []

      items.forEach(item => {
        const product = productsMap[item.product_id]
        if (!product) {
          throw new Error(`商品ID ${item.product_id} 不存在`)
        }

        const item_total = product.price * item.quantity
        total_amount += item_total

        orderItems.push({
          product_id: item.product_id,
          product_name: product.name,
          product_image: product.images[0] || '',
          price: product.price,
          quantity: item.quantity,
          total_price: item_total
        })
      })

      // 创建订单
      const order_no = generateOrderNo()
      const { data: order } = await ordersCollection.add({
        data: {
          openid: OPENID,
          order_no,
          total_amount,
          status: 'pending',
          shipping_name: address.receiver_name,
          shipping_phone: address.receiver_phone,
          shipping_address: `${address.province}${address.city}${address.district}${address.detail_address}`,
          items: orderItems,
          created_at: db.serverDate(),
          updated_at: db.serverDate()
        }
      })

      // 清空购物车
      const cart_ids = items.map(item => item.cart_id)
      if (cart_ids.length > 0) {
        await db.collection('cart')
          .where({
            _id: _.in(cart_ids)
          })
          .remove()
      }

      // 更新商品销量和库存
      const productsCollection = db.collection('products')
      for (const item of items) {
        const product = productsMap[item.product_id]
        await productsCollection.doc(item.product_id).update({
          data: {
            stock: _.inc(-item.quantity),
            sales: _.inc(item.quantity)
          }
        })
      }

      return {
        code: 0,
        data: {
          _id: order._id,
          order_no,
          total_amount
        },
        message: '创建订单成功'
      }
    }

    if (action === 'list') {
      // 获取订单列表
      const { data } = await ordersCollection
        .where({
          openid: OPENID,
          ...(status && { status })
        })
        .orderBy('created_at', 'desc')
        .get()

      return {
        code: 0,
        data: data
      }
    }

    if (action === 'detail') {
      // 获取订单详情
      const { data } = await ordersCollection.doc(order_id).get()

      if (!data || data.openid !== OPENID) {
        return {
          code: -1,
          message: '订单不存在'
        }
      }

      return {
        code: 0,
        data: data
      }
    }

    if (action === 'cancel') {
      // 取消订单
      const { data: order } = await ordersCollection.doc(order_id).get()

      if (!order || order.openid !== OPENID) {
        return {
          code: -1,
          message: '订单不存在'
        }
      }

      if (order.status !== 'pending') {
        return {
          code: -1,
          message: '只能取消待付款订单'
        }
      }

      // 恢复库存
      const productsCollection = db.collection('products')
      for (const item of order.items) {
        await productsCollection.doc(item.product_id).update({
          data: {
            stock: _.inc(item.quantity),
            sales: _.inc(-item.quantity)
          }
        })
      }

      // 更新订单状态
      await ordersCollection.doc(order_id).update({
        data: {
          status: 'cancelled',
          updated_at: db.serverDate()
        }
      })

      return {
        code: 0,
        message: '订单已取消'
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
