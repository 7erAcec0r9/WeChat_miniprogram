// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    PageCur: 'home'
  },
  // 事件处理函数

  onLoad() {

  },
  navChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },
})
