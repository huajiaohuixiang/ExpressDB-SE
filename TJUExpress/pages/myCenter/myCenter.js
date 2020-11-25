//获取应用实例
var app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:{
      "nickName":"Sleepycat",
      "avatarUrl":"../../images/header.jpg"
    }
  },
  querysender: function () {
    wx.navigateTo({
      url: '../orderList/orderList'
    })
  },
  queryrecieve: function(){
    wx.navigateTo({
      url: '../toRecieve/toRecieve'
    })
  },
  changeaddr: function(){
    wx.navigateTo({
      url: '../changeaddr/changeaddr'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    wx.getSetting({
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
    })
    
  }
})