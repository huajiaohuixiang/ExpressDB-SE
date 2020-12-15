// pages/register/register.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    phone:"",
    password:"",
    sex:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  login:function(){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  _username:function(e){
    this.setData({
      username:e.detail.value
    })
  },
  _phone:function(e){
    this.setData({
      phone:e.detail.value
    })
  },
  _password:function(e){
    this.setData({
      password:e.detail.value
    })
  },
  _sex:function(e){
    this.setData({
      sex:e.detail.value
    })
    console.log(e)
    console.log(e.detail.value)
  },
  formSubmit: function (e) {
    var params = e.detail.value
    params.username = this.data.username
    params.phone = this.data.phone
    params.password = this.data.password
    params.sex = this.data.sex
    console.log('params', params)
    
    if (params.username == "") {
      wx.showModal({
        title: '提示',
        content: '请输入昵称',
      })
      return
    }
    if (params.phone == "") {
      wx.showModal({
        title: '提示',
        content: '请输入手机号',
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
    if (params.sex == "") {
      wx.showModal({
        title: '提示',
        content: '请选择性别',
      })
      return
    }
    app.globalData.login=1
    app.globalData.userInfo.userName=this.data.username
    app.globalData.userInfo.phone=this.data.phone
    app.globalData.userInfo.sex=this.data.sex
    wx.showLoading({
      title: '正在注册',
    }),
    wx.request({
      url:'https://www.csystd.cn:9999/register',
      
      data:{
        'userID':params.phone,
        'password':params.password,
        'name':params.username,
        'sex':params.sex
      },
      method:'POST',
      header:{
        'content-type':'application/json'
      },
      
      success(res){
        wx.hideLoading()
        if(res.data=='success'){
          wx.showModal({
            title: '提示',
            content:'注册成功！',
            complete:function(){
              try{
                wx.switchTab({
                  url: '../myCenter/myCenter',
                })
              }catch(e){
                console.log("页面导航失败")
              }
            }
          })
        }
        else{
          wx.showModal({
            title: '提示',
            content:'注册失败，请检查手机号是否以及注册，或用户名\密码过长。'
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