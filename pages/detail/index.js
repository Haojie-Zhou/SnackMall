// pages/detail/index.js
Page({
  data: {
    goods: {},
    isFavorite: false
  },

  onLoad(options) {
    const id = options.id
    this.loadGoodsDetail(id)
  },

  // 加载商品详情
  loadGoodsDetail(id) {
    // 模拟数据，实际应该调用后端 API
    const mockGoods = {
      id: id,
      name: '商品详情',
      desc: '这是商品的详细描述信息',
      price: '99.00',
      originalPrice: '199.00',
      sales: 1234,
      images: [
        '/images/goods1.jpg',
        '/images/goods2.jpg',
        '/images/goods3.jpg'
      ],
      detailImages: [
        '/images/detail1.jpg',
        '/images/detail2.jpg'
      ]
    }

    this.setData({
      goods: mockGoods
    })
  },

  // 切换收藏
  toggleFavorite() {
    this.setData({
      isFavorite: !this.data.isFavorite
    })
    wx.showToast({
      title: this.data.isFavorite ? '已收藏' : '已取消收藏',
      icon: 'success'
    })
  },

  // 加入购物车
  addToCart() {
    const app = getApp()
    const goods = this.data.goods
    const cart = app.globalData.cart || []

    // 检查商品是否已在购物车
    const existingIndex = cart.findIndex(item => item.id === goods.id)

    if (existingIndex > -1) {
      cart[existingIndex].quantity++
    } else {
      cart.push({
        id: goods.id,
        name: goods.name,
        price: parseFloat(goods.price),
        image: goods.images[0],
        quantity: 1,
        selected: true
      })
    }

    app.globalData.cart = cart

    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    })
  },

  // 立即购买
  buyNow() {
    wx.showToast({
      title: '购买功能开发中',
      icon: 'none'
    })
  }
})
