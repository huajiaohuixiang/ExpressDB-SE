//const { userInfo } = require("os");

//app.js
globalData: {
  openId:""
};
App({
  onLaunch: function () {
    
    var that = this
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    /*wx.login({
      success: function (res) {
        //调用request请求api转换登录凭证
        wx.request({
          url: 'https://test.com/onLogin',
          data: {
            code: res.code
          },
          success: function (code) {
            getApp().globalData.openId=res.code;
            console.log("login",res) //获取openid
          }
        })
      }
    }),
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女 
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        console.log('user',userInfo)
      }
    })*/
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        url: 'https://test.com/onLogin',
        data: {
          code: res.code
        },
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})