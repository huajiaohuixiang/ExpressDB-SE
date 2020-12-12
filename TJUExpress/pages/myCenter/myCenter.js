//获取应用实例
var app = getApp();
Page({
  data: {
    "iflogin":app.globalData.login,
    //canIUse: wx.canIUse('button.open-type.getUserInfo'),
    "userInfo":{
      "nickName":"Sleepycat",
      "avatarUrl":"../../images/header.jpg"
    }
  },
  onShow:function() {
    console.log(app.globalData.login)
    var iflogin = app.globalData.login
    if(iflogin==0){
      wx.showModal({
        title: '提示',
        content:'请先登录'
      })
    }
    this.setData({
      iflogin:app.globalData.login
    })
  },
  onLoad: function () {
    console.log(app.globalData.login)
   
    //调用应用实例的方法获取全局数据
    /*wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              that.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })*/
    
  },
  login:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  querysender: function () {
    wx.navigateTo({
      url: '../orderList/orderList'
    })
  },
  querypackage: function(){
    wx.navigateTo({
      url: '../toRecieve/toRecieve'
    })
  },
  changeaddr: function(){
    wx.navigateTo({
      url: '../userdetail/userdetail'
    })
  },
  
})