//获取应用实例
var app = getApp();
Page({
  data: {
    "iflogin":0,
    "userInfo":{},
    sex:0
  },
  
  onShow: function () {
    
    var token=app.globalData.token
    var that = this
    console.log(token)
    wx.request({
      url:'https://www.csystd.cn:9999/user/getUserInfo',
      method:'GET',
      data:{
      },
      header:{
        "Token":token
      },
      success:function(res){
        var userId=res.data.userID
        var userName=res.data.name
        var city=res.data.city
        var province=res.data.province
        var region=res.data.region
        var detail=res.data.detail
        var sex=res.data.sex
        app.globalData.userInfo.userId=userId
        app.globalData.userInfo.userName=userName
        app.globalData.userInfo.city=city
        app.globalData.userInfo.province=province
        app.globalData.userInfo.region=region
        app.globalData.userInfo.detail=detail
        app.globalData.userInfo.sex=sex
        var userinfo = app.globalData.userInfo
        var login = app.globalData.login
        that.setData({
          iflogin:login,
          userInfo:userinfo
        })
        if(userinfo.sex=="男")
        {
          that.setData({
            sex:1
          })
        }
        else{
          that.setData({
            sex:0
          })
        }
      }
    })
    
   /*wx.login({
     success:res => {
       console.log("code"+res.code)
     }
   })*/
    
    
    /*wx.requestSubscribeMessage({
      tmplIds: ['M4jSd-7ICN-c615OLQmAx9QJqs9EYTtH3jfTx7nveig'],
      success(res){
        console.log("用户订阅通知成功。")
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