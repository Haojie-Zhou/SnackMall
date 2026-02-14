// pages/user/index.js
Page({
  data: {
    userInfo: {}
  },

  onLoad() {
    this.loadUserInfo()
  },

  onShow() {
    this.loadUserInfo()
  },

  // 加载用户信息
  loadUserInfo() {
    const app = getApp()
    this.setData({
      userInfo: app.globalData.userInfo || {}
    })
  },

  // 登录
  login() {
    wx.showLoading({
      title: '登录中...'
    })

    // 调用登录云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        wx.hideLoading()
        const result = res.result

        if (result.code === 0) {
          const app = getApp()
          app.globalData.openid = result.data.openid
          app.globalData.userInfo = result.data.user

          this.setData({
            userInfo: result.data.user
          })

          wx.showToast({
            title: '登录成功',
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: result.message || '登录失败',
            icon: 'none'
          })
        }
      },
      fail: err => {
        wx.hideLoading()
        console.error('登录失败', err)
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        })
      }
    })
  },

  // 跳转到订单列表
  goToOrderList(e) {
    const type = e.currentTarget.dataset.type
    wx.showToast({
      title: '订单功能开发中',
      icon: 'none'
    })
  },

  // 跳转到地址管理
  goToAddress() {
    wx.showToast({
      title: '地址管理功能开发中',
      icon: 'none'
    })
  },

  // 跳转到我的订单
  goToOrders() {
    wx.showToast({
      title: '订单功能开发中',
      icon: 'none'
    })
  },

  // 跳转到收藏
  goToFavorites() {
    wx.showToast({
      title: '收藏功能开发中',
      icon: 'none'
    })
  },

  // 跳转到设置
  goToSettings() {
    wx.showToast({
      title: '设置功能开发中',
      icon: 'none'
    })
  },

  // 联系客服
  contactService() {
    wx.showModal({
      title: '联系客服',
      content: '客服电话：400-123-4567',
      confirmText: '拨打',
      success: (res) => {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '400-123-4567'
          })
        }
      }
    })
  }
})
