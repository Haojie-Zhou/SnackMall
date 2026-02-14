// 商品管理云函数
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

/**
 * 获取商品列表
 */
exports.main = async (event, context) => {
  const { action, category_id, product_id, skip = 0, limit = 20 } = event

  try {
    if (action === 'list') {
      // 获取商品列表
      const { data } = await db.collection('products')
        .where({
          is_active: true,
          ...(category_id && { category_id })
        })
        .orderBy('sales', 'desc')
        .skip(skip)
        .limit(limit)
        .get()

      return {
        code: 0,
        data: data
      }
    }

    if (action === 'detail') {
      // 获取商品详情
      const { data } = await db.collection('products')
        .doc(product_id)
        .get()

      return {
        code: 0,
        data: data
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
