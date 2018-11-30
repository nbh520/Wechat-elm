//index.js
//获取应用实例
const app = getApp()
const fetch = require('../../utils/fetch.js')
Page({
  data: {
    addressInfo: {}, //地址信息
    detailAddress: '江岸区武汉市发改委（沿江大道西）', //详细地址
    swiperCategory: [
      []
    ], //滑动内容
    indicatorDots: true, //是否显示面板指示点
    autoPlay: true, //是否自动切换
    duration: 500, //滑动时长
    shopList: [], //商家列表
    refresh: false, //下拉刷新
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.reqShopCategory();
    this.onReqAddress();
    wx.setStorage({
      key: 'UserInfo',
      data: {
        username: 123,
        password: 321
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    wx.getStorage({
      key: 'UserInfo',
      success: function(res) {
        res.data.username = 111;
        console.log(res.data)
       wx.setStorage({
         key: 'UserInfo',
         data: 
           res.data,
       })

      },
    })

    setTimeout(()=>{
      console.log(wx.getStorageSync('UserInfo'))
    },1000)
  },
    

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
    this.setData({
      refresh: true
    })
    setTimeout(() => {
      this.setData({
        refresh: false
      })
    }, 1000)
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
    let _this = this;
    wx.getLocation({
      success: res => {
        const {
          latitude,
          longitude
        } = res
        fetch(`http://nibohan.xin:4000/position/${latitude},${longitude}`).then(res => {
          let detailAddress = res.data.data.name
          if (detailAddress.length > 10){
            detailAddress = detailAddress.slice(0, 9) + '...'
          }
          this.setData({
            detailAddress: detailAddress
          });
          this.reqShopList(latitude, longitude);
        })
      },
    })
  },
  //获取商家列表
  reqShopList(latitude, longitude) {
    fetch(`https://elm.cangdu.org/shopping/restaurants?latitude=${latitude}&longitude=${longitude}`).then(res => {
      this.setData({
        shopList: res.data
      })
    })
  },
  reqShopCategory() {
    let _this = this;
    let swiperArr = [];
    fetch('https://elm.cangdu.org/v2/index_entry').then(res => {
      let arr = res.data;
      this.setData({
        swiperCategory: this.conversionTwoArr(arr, 8),
      })
    })
  },
  //跳转食物详情
  jump: function(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../food/food?id=' + id
    })
  },
  //一维数组转换二维数组
  conversionTwoArr: function(arr = [], minNumber = 2) {
    let len = Math.ceil(arr.length / minNumber)
    let reArr = []
    let arr1 = []
    for (let i = 0; i < arr.length; i++) {
      if ((i + 1) % minNumber === 0){
        arr1[i % 8] = arr[i]
        reArr.push(arr1)
        arr1 = [];
        continue
      }
      arr1[i % 8] = arr[i]
    }

    return reArr;
  }
})