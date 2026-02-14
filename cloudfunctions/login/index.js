// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const _ = db.command

/**
 * 微信小程序登录
 */
exports.main = async (event, context) => {
  const { code } = event

  try {
    // 获取微信登录信息
    const wxContext = cloud.getWXContext()
    const { OPENID } = wxContext

    // 查找或创建用户
    const userCollection = db.collection('users')
    const { data: users } = await userCollection
      .where({ openid: OPENID })
      .get()

    let user
    if (users.length === 0) {
      // 创建新用户
      const { data: newUser } = await userCollection.add({
        data: {
          openid: OPENID,
          nickname: '',
          avatar: '',
          phone: '',
          is_active: true,
          created_at: db.serverDate(),
          updated_at: db.serverDate()
        }
      })

      const { data } = await userCollection.doc(newUser._id).get()
      user = data
    } else {
      user = users[0]
    }

    return {
      code: 0,
      message: '登录成功',
      data: {
        openid: OPENID,
        user: user
      }
    }
  } catch (error) {
    console.error('登录失败:', error)
    return {
      code: -1,
      message: error.message || '登录失败'
    }
  }
}
