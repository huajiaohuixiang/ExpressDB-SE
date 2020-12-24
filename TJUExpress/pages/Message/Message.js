// pages/Message.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      messageType:"寄件消息",
      content:"您的寄件订单已被接单，快递员00001将在您预约时间内上门，上门后给取件码4411，为安全取件，建议与快递小哥电话联系"
    },
    {
      messageType:"取件消息",
      content:"您的包裹已到达，请携带有效证件前往快递站领取，取件码TJ000001.请在8：00-17：30内取件"
    }
  ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var userid = app.globalData.userInfo.userId
    var iflogin = app.globalData.login
    var token = app.globalData.token
    var that = this
    if(iflogin==0){
      wx.showModal({
        title: '提示',
        content:'请先登录'
      })
    }
    console.log(userid)
    wx.request({
      url:'https://www.csystd.cn:9999/user/getMyMessage',
      method:'GET',
      data:{
        userID:userid
      },
      header:{
        'Token':token
      },
      success:function(res){
        console.log(res.data)
        var msg = res.data
        that.setData({
          list:msg
        })
      }
    })
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