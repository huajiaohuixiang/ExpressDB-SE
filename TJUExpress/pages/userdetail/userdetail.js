var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    username:'',
    phone:'',
    province:'',
    city:'',
    region:'',
    detail:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    console.log(app.globalData.userInfo)
    var username = app.globalData.userInfo.userName
    var phone = app.globalData.userInfo.userId
    var province = app.globalData.userInfo.province
    var city = app.globalData.userInfo.city
    var region = app.globalData.userInfo.region
    var detail = app.globalData.userInfo.detail
    this.setData({
      username:username,
      phone:phone,
      province:province,
      city:city,
      region:region,
      detail:detail
    })
  },
  changeinfo: function(){
    wx.navigateTo({
      url: '../addr/addr',
    })
  },
  onShow:function(){
    var username = app.globalData.userInfo.userName
    var phone = app.globalData.userInfo.userId
    var province = app.globalData.userInfo.province
    var city = app.globalData.userInfo.city
    var region = app.globalData.userInfo.region
    var detail = app.globalData.userInfo.detail
    this.setData({
      username:username,
      phone:phone,
      province:province,
      city:city,
      region:region,
      detail:detail
    })
  }
})