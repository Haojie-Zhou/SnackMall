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
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const app = getApp()
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo
        })
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
      },
      fail: (err) => {
        console.error('登录失败', err)
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
