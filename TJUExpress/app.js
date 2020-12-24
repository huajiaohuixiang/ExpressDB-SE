//app.js
App({
  globalData: {
    login:0,
    token:"",
    userInfo:{
      userId:"",
      userName:"",
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
  },
  
})