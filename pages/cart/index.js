// pages/cart/index.js
Page({
  data: {
    cartList: [],
    allSelected: false,
    totalPrice: '0.00',
    selectedCount: 0
  },

  onLoad() {
    this.loadCart()
  },

  onShow() {
    this.loadCart()
  },

  // 加载购物车数据
  loadCart() {
    const app = getApp()
    const cart = app.globalData.cart || []
    this.setData({
      cartList: cart
    })
    this.calculateTotal()
  },

  // 切换选中状态
  toggleSelect(e) {
    const index = e.currentTarget.dataset.index
    const cartList = this.data.cartList
    cartList[index].selected = !cartList[index].selected
    this.setData({ cartList })
    this.calculateTotal()
  },

  // 全选/取消全选
  toggleSelectAll() {
    const cartList = this.data.cartList
    const allSelected = !this.data.allSelected
    cartList.forEach(item => {
      item.selected = allSelected
    })
    this.setData({
      cartList,
      allSelected
    })
    this.calculateTotal()
  },

  // 增加数量
  increaseQuantity(e) {
    const index = e.currentTarget.dataset.index
    const cartList = this.data.cartList
    cartList[index].quantity++
    this.setData({ cartList })
    this.calculateTotal()
  },

  // 减少数量
  decreaseQuantity(e) {
    const index = e.currentTarget.dataset.index
    const cartList = this.data.cartList
    if (cartList[index].quantity > 1) {
      cartList[index].quantity--
      this.setData({ cartList })
      this.calculateTotal()
    }
  },

  // 计算总价
  calculateTotal() {
    const cartList = this.data.cartList
    let totalPrice = 0
    let selectedCount = 0
    let allSelected = cartList.length > 0

    cartList.forEach(item => {
      if (item.selected) {
        totalPrice += item.price * item.quantity
        selectedCount++
      } else {
        allSelected = false
      }
    })

    this.setData({
      totalPrice: totalPrice.toFixed(2),
      selectedCount,
      allSelected
    })

    // 更新全局购物车数据
    const app = getApp()
    app.globalData.cart = cartList
  },

  // 结算
  checkout() {
    if (this.data.selectedCount === 0) {
      wx.showToast({
        title: '请选择商品',
        icon: 'none'
      })
      return
    }
    wx.showToast({
      title: '结算功能开发中',
      icon: 'none'
    })
  },

  // 去首页
  goToHome() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  }
})
