// pages/index/index.js
Page({
  data: {
    banners: [
      {
        id: 1,
        image: '/images/banner1.jpg'
      },
      {
        id: 2,
        image: '/images/banner2.jpg'
      },
      {
        id: 3,
        image: '/images/banner3.jpg'
      }
    ],
    goodsList: [
      {
        id: 1,
        name: '商品1',
        desc: '商品描述信息',
        price: '99.00',
        originalPrice: '199.00',
        image: '/images/goods1.jpg'
      },
      {
        id: 2,
        name: '商品2',
        desc: '商品描述信息',
        price: '199.00',
        originalPrice: '299.00',
        image: '/images/goods2.jpg'
      },
      {
        id: 3,
        name: '商品3',
        desc: '商品描述信息',
        price: '299.00',
        originalPrice: '399.00',
        image: '/images/goods3.jpg'
      },
      {
        id: 4,
        name: '商品4',
        desc: '商品描述信息',
        price: '399.00',
        originalPrice: '499.00',
        image: '/images/goods4.jpg'
      }
    ]
  },

  onLoad() {
    this.loadGoods()
  },

  // 加载商品数据
  loadGoods() {
    wx.showLoading({ title: '加载中...' })

    // 调用商品云函数
    wx.cloud.callFunction({
      name: 'products',
      data: {
        action: 'list'
      },
      success: res => {
        wx.hideLoading()
        const result = res.result

        if (result.code === 0) {
          this.setData({
            goodsList: result.data
          })
        } else {
          wx.showToast({
            title: result.message || '加载失败',
            icon: 'none'
          })
        }
      },
      fail: err => {
        wx.hideLoading()
        console.error('加载商品失败', err)
      }
    })
  },

  // 搜索商品
  onSearch(e) {
    const keyword = e.detail.value
    console.log('搜索:', keyword)
  },

  // 跳转到商品详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }
})
