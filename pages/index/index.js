//index.js
//获取应用实例
const app = getApp()
// import {fetch} from '../../utils/fetch.js'
const fetch = require('../../utils/fetch.js')
Page({
  data: {
    addressInfo: {}, //地址信息
    detailAddress: '江岸区武汉市发改委（沿江大道西）', //详细地址
    swiperImgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'https://i1.hdslb.com/bfs/archive/2c7d3b4f961e6b7f4b2eee73b396aad1b85c49a8.jpg@320w_200h.webp',
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg'
    ], //滑动轮播图片
    indicatorDots: true, //是否显示面板指示点
    autoPlay: true, //是否自动切换
    duration: 500, //滑动时长
    shopList :[], //商家列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.onReqAddress();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    console.log('下拉刷新')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(obj) {
    console.log("分享监听", obj)
  },
  //获取地理信息
  onReqAddress: function() {
    fetch('https://elm.cangdu.org/v1/cities?type=guess').then(res => {
      this.setData({
        address: res.data
      })
      const {
        latitude,
        longitude
      } = res.data
      fetch(`http://nibohan.xin:4000/position/${latitude},${longitude}`).then(res => {
        this.setData({
          detailAddress: res.data.data.name
        });
        fetch(`https://elm.cangdu.org/shopping/restaurants?latitude=${latitude}&longitude=${longitude}`).then(res => {
          this.setData({
            shopList: res.data
          })
          console.log(res.data)
        })
      })
    }, error => {
      console.log(error)
    })
  }
})