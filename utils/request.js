/** request 请求基础类 */
class request {
  constructor() {
    this._header = {}
  }


  /* 设置统一的异常处理 */
  setErrorHandler(handler) {
    this._errorHandler = handler;
  }
  /** get类型的网络请求 */
  getRequest(url, data, header = this._header) {
    return this.requestAll(url, data, header, 'GET')
  }

  /** Delete类型网络请求 */
  deleteRequest(url, data, header = this._header){
    return this.requestAll(url, data, header, 'DELETE')
  }
  /** PUT类型网络请求 */
  putRequest(url, data, header = this._header){
    return this.requestAll(url, data, header, 'PUT')
  }
  /** POST类型请求 */
  postRequest(url, data, header = this._header){
    return this.requestAll(url, data, header, 'POST')
  }

  requestAll(url, data, header, method){
    return new Promise((resolve, reject) => {
      wx.request({
        url,
        data,
        header,
        method,
        success: (res => {
          if(res.statusCode === 200){
            resolve(res)
          }else{
            if(this._errorHandler !== null){
              this._errorHandler(res)
            }
            reject(res)
          }
        }),
        fail: res => {
          if(this._errorHandler !== null){
            this._errorHandler(res)
          }
          reject(res)
        }
      })
    })
  }
}
module.exprots = request