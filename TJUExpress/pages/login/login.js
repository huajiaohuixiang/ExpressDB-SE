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
    var login=this.login
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
    app.globalData.login=1
    app.globalData.userInfo.userid=this.data.userid
    if(app.globalData.login==1){
      wx.switchTab({
        url: '../myCenter/myCenter',
      })
    }
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