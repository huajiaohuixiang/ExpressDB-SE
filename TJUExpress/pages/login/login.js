// pages/login/login.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid:'',
    password:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  register:function() {
    wx.navigateTo({
      url: '../register/register',
    })
  },
  _userid:function(e){
    this.setData({
      userid:e.detail.value
    })
  },
  _password:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  formSubmit: function (e) {
    var params = e.detail.value
    params.userid = this.data.userid
    params.password = this.data.password
    console.log('params', params)
    if (params.userid == "") {
      wx.showModal({
        title: '提示',
        content: '请输入账号',
      })
      return
    }
    if (params.password == "") {
      wx.showModal({
        title: '提示',
        content: '请输入密码',
      })
      return
    }
    
    wx.showLoading({
      title: '正在登录',
    })
    wx.request({
      url:'https://www.csystd.cn:9999/account/enroll',
      data:{
        userID:params.userid,
        password:params.password
      },
      method:'POST',
      header:{
        'content-type':'application/json'
      },
      success(res){
        wx.hideLoading()
        var jwt = res.data
        if(jwt==""){
          wx.showModal({
            title: '登陆失败',
            content:'用户名不存在或密码错误'
          })
        }
        else{
          app.globalData.login=1
          app.globalData.userInfo.userId=params.userid
          app.globalData.token=jwt
          wx.switchTab({
            url: '../myCenter/myCenter',
          })
        }
          
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})