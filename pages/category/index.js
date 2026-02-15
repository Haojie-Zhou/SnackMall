// pages/category/index.js
Page({
  data: {
    activeIndex: 0,
    activeCategoryId: 0,
    activeCategoryName: '',
    categories: [],
    goodsList: []
  },

  onLoad() {
    this.loadCategories()
  },

  onShow() {
    if (this.data.categories.length > 0) {
      this.loadCategoryGoods(this.data.activeCategoryId)
    }
  },

  // 加载分类列表
  loadCategories() {
    wx.showLoading({ title: '加载中...' })

    console.log('开始加载分类列表...')

    // 从云数据库加载分类
    wx.cloud.callFunction({
      name: 'products',
      data: {
        action: 'list_categories'
      },
      success: res => {
        wx.hideLoading()
        console.log('分类加载成功:', res)

        const result = res.result

        if (result.code === 0) {
          // 添加"全部"分类
          const allCategories = [
            { id: 0, name: '全部商品' },
            ...result.data
          ]

          this.setData({
            categories: allCategories
          })
          this.loadCategoryGoods(0)
        } else {
          console.error('分类加载失败:', result.message)
          wx.showToast({
            title: result.message || '加载分类失败',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail: err => {
        wx.hideLoading()
        console.error('分类加载失败:', err)
        wx.showModal({
          title: '提示',
          content: '云函数调用失败，请检查：\n1. 云函数是否已部署\n2. 云环境ID是否配置正确\n3. 云开发是否已开通',
          showCancel: false
        })
      }
    })
  },

  // 点击分类
  onCategoryClick(e) {
    const index = e.currentTarget.dataset.index
    const categoryId = e.currentTarget.dataset.id
    const categoryName = this.data.categories[index].name

    console.log('点击分类:', categoryId, categoryName)

    this.setData({
      activeIndex: index,
      activeCategoryId: categoryId,
      activeCategoryName: categoryName
    })
    this.loadCategoryGoods(categoryId)
  },

  // 加载分类商品
  loadCategoryGoods(categoryId) {
    wx.showLoading({ title: '加载中...' })

    console.log('加载分类商品:', categoryId)

    // 调用商品云函数
    wx.cloud.callFunction({
      name: 'products',
      data: {
        action: 'list',
        category_id: categoryId === 0 ? undefined : categoryId
      },
      success: res => {
        wx.hideLoading()
        console.log('商品加载成功:', res)

        const result = res.result

        if (result.code === 0) {
          this.setData({
            goodsList: result.data
          })
        } else {
          console.error('商品加载失败:', result.message)
          wx.showToast({
            title: result.message || '加载商品失败',
            icon: 'none'
          })
        }
      },
      fail: err => {
        wx.hideLoading()
        console.error('商品加载失败:', err)
        wx.showToast({
          title: '加载商品失败',
          icon: 'none'
        })
      }
    })
  },

  // 跳转到商品详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  },

  // 页面导航
  navigateTo(e) {
    const page = e.currentTarget.dataset.page
    if (page === 'index') {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    } else {
      wx.navigateTo({
        url: `/pages/${page}/index`
      })
    }
  }
})
