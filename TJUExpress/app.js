//app.js
App({
  globalData: {
    openId:"",
    login:0,
    userInfo:{
      userId:"",
      userName:"",
      phone:"",
      sex:"",
      province:"",
      city:"",
      region:"",
      detail:""
    }
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    /*wx.login({
      success: function (res) {
        var code = res.code; //返回code
        console.log(code);
        var appId = 'wxc5c06037860cba5d';
        var secret = '1ea491654d6153790704e40c4b8697dd';
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
          data: {},
          header: {
            'content-type': 'json'
          },
          success: function (res) {
            var openid = res.data.openid //返回openid
            console.log('openid为' + openid);
          }
        })
      }
    })*/
  },
  
})