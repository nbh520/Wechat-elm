module.exports = function(url = "", type = "GET", dataType = "json") {
  return new Promise(function (reslove, reject) {
    wx.request({
      url,
      type,
      header: {
        'content-type': 'application/json',
        'User-Agen': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1 wechatdevtools/1.02.1811150 MicroMessenger/6.7.3 Language/zh_CN webview/ token/dd5fd524d406d80583b3971e2bc25e61'
      },
      dataType,
      success(res) {
        reslove(res);
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

