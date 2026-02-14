// pages/category/index.js
Page({
  data: {
    activeIndex: 0,
    activeCategoryId: 0,
    activeCategoryName: '',
    categories: [
      { id: 0, name: '全部商品' },
      { id: 1, name: '电子产品' },
      { id: 2, name: '服装鞋包' },
      { id: 3, name: '食品饮料' },
      { id: 4, name: '家居生活' },
      { id: 5, name: '美妆护肤' },
      { id: 6, name: '图书文具' },
      { id: 7, name: '运动户外' }
    ],
    goodsList: []
  },

  onLoad() {
    this.loadCategoryGoods(0)
  },

  // 点击分类
  onCategoryClick(e) {
    const index = e.currentTarget.dataset.index
    const categoryId = e.currentTarget.dataset.id
    this.setData({
      activeIndex: index,
      activeCategoryId: categoryId,
      activeCategoryName: this.data.categories[index].name
    })
    this.loadCategoryGoods(categoryId)
  },

  // 加载分类商品
  loadCategoryGoods(categoryId) {
    // 模拟数据，实际应该调用后端 API
    const mockGoods = [
      {
        id: 1,
        name: '商品1',
        price: '99.00',
        image: '/images/goods1.jpg'
      },
      {
        id: 2,
        name: '商品2',
        price: '199.00',
        image: '/images/goods2.jpg'
      },
      {
        id: 3,
        name: '商品3',
        price: '299.00',
        image: '/images/goods3.jpg'
      },
      {
        id: 4,
        name: '商品4',
        price: '399.00',
        image: '/images/goods4.jpg'
      }
    ]

    this.setData({
      goodsList: mockGoods,
      activeCategoryName: this.data.categories[categoryId].name
    })
  },

  // 跳转到商品详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/index?id=${id}`
    })
  }
})
