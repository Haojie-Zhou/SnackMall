// 地址管理云函数
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()

/**
 * 地址操作
 */
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const { OPENID } = wxContext
  const { action, address_id, address_data } = event

  try {
    const addressesCollection = db.collection('addresses')

    if (action === 'list') {
      // 获取地址列表
      const { data } = await addressesCollection
        .where({ openid: OPENID })
        .orderBy('is_default', 'desc')
        .get()

      return {
        code: 0,
        data: data
      }
    }

    if (action === 'add') {
      // 添加地址
      if (address_data.is_default) {
        // 取消其他默认地址
        await addressesCollection
          .where({
            openid: OPENID,
            is_default: true
          })
          .update({
            data: {
              is_default: false
            }
          })
      }

      await addressesCollection.add({
        data: {
          openid: OPENID,
          ...address_data,
          created_at: db.serverDate(),
          updated_at: db.serverDate()
        }
      })

      return {
        code: 0,
        message: '添加成功'
      }
    }

    if (action === 'update') {
      // 更新地址
      if (address_data.is_default) {
        // 取消其他默认地址
        await addressesCollection
          .where({
            openid: OPENID,
            _id: _.neq(address_id),
            is_default: true
          })
          .update({
            data: {
              is_default: false
            }
          })
      }

      await addressesCollection.doc(address_id).update({
        data: {
          ...address_data,
          updated_at: db.serverDate()
        }
      })

      return {
        code: 0,
        message: '更新成功'
      }
    }

    if (action === 'delete') {
      // 删除地址
      await addressesCollection.doc(address_id).remove()

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
