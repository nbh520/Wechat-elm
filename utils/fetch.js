module.exports = function(url = "", type = "GET", dataType = "json") {
  return new Promise(function (reslove, reject) {
    wx.request({
      url,
      type,
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

