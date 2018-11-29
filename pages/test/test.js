// pages/test/test.js
const wxpay = require('../../utils/pay.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    UserInfo: {},
    sessionKey: '',
    openid: '',
    encryptedData: '',
    appId: 'wx6d96a866a6e7a222',
    secret: '980c08c6c834a650b95fc0f8a6cc9e44',
    iv: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    let _this = this
    this.login().then(res => {
      wx.request({
        url: 'http://192.168.0.17:3000/getOpenid',
        data:{
          js_code: res.code,
          appId: 'wx6d96a866a6e7a222'
        },
        success(res){
          console.log(res)
          _this.data.openid = res.data.openid
          _this.data.sessionKey = res.data.session_key
          wx.getUserInfo({
            success(res){
              console.log(res)
              _this.setData({
                UserInfo: res.userInfo
              })
              _this.data.encryptedData = res.encryptedData;
              _this.data.iv = res.iv
              let data = {
                appid: _this.data.appId,
                sessionKey: _this.data.sessionKey,
                encryptedData: _this.data.encryptedData,
                iv: _this.data.iv
              }
              wx.request({
                url: 'http://192.168.0.17:3000/decr',
                method: 'POST',
                data,
                success(res){
                  console.log(res)
                  wx.request({
                    url: 'https://14592619.qcloud.la/payment',
                    method: 'POST',
                    data:{
                      openid: _this.data.openid
                    },
                    success(res){
                      console.log(res)
                    },
                    fail(error){
                      console.log(error)
                    }
                  })
                }
              })
            }
          })
        }
      })


      // wx.request({
      //   url: 'https://api.weixin.qq.com/sns/jscode2session',
      //   data: {
      //     js_code: res.code,
      //     appid: 'wx6d96a866a6e7a222',
      //     secret: '980c08c6c834a650b95fc0f8a6cc9e44'
      //   },
      //   success(res) {
      //     _this.data.openid = res.data.openid
      //     _this.data.sessionKey = res.data.session_key
      //     console.log(res)
      //     wx.getUserInfo({
      //       success(res) {
      //         console.log(res)
      //         _this.data.encryptedData = res.encryptedData;
      //         _this.data.iv = res.iv
      //         let data = {
      //           appid: _this.data.appId,
      //           sessionKey: _this.data.sessionKey,
      //           encryptedData: _this.data.encryptedData,
      //           iv: _this.data.iv
      //         }
      //         wx.request({
      //           url: 'http://localhost:3000/decr',
      //           method: 'POST',
      //           data,
      //           success(res){
      //             console.log(res)
      //           }
      //         })

      //         // wx.request({
      //         //   url: 'https://14592619.qcloud.la/payment',
      //         //   data:{
      //         //     openid: _this.data.openid
      //         //   },
      //         //   method: 'POST',
      //         //   success(res){
      //         //     console.log(res)
      //         //   }
      //         // })
      //       },
      //       fail(){
      //         console.log('获取权限错误')
      //       }
      //     })

          
      //   }
      // })
      
    })
  },
  getPhoneNumber(e) {
    this.login().then(res => {
      console.log(res)
    })
  },
  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success(res) {
          resolve(res);
        }
      })
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(options) {
    return {
      title: '个人信息',
      path: 'pages/test/test',
      desc: '描述',
      success: function(res){
        console.log('转发成功',res)
      },
      fail: function(res){
        console.log('转发失败', res)
      }
    }
  },
  bindShare:function(){
    console.log('转发信息')
    wx.updateShareMenu({
      withShareTicket: true,
      isUpdatableMessage: true,
      activityId: '', // 活动 ID
      templateInfo: {
        parameterList: [{
          name: 'member_count',
          value: '1'
        }, {
          name: 'room_limit',
          value: '3'
        }]
      }
    })
  },
  pay:function(){
    wx.request({
      url: 'https://api.mch.weixin.qq.com/sandboxnew/pay/getsignkey',
      method: 'POST',
      success(res){
        console.log(res.data)
      }
    })
  }
})