
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    iflogin:app.globalData.login,
    couriers:["中通快递","圆通速递","顺丰速运","中国邮政"],
    chooseCouriers:"请选择快递公司",
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.login)
    
  },
  onShow: function() {
    this.setData({
      iflogin:app.globalData.login
    })
    var iflogin = app.globalData.login
    if(iflogin==0){
      wx.showModal({
        title: '提示',
        content:'请先登录'
      })
    }
  },
  iflogin:function(){
    var iflogin = app.globalData.login
    if(iflogin==0){
      wx.navigateTo({
        url: '../login/login',
      })
    }
  },
  _courier: function (e) {
  this.setData({
    index:e.detail.value,
    chooseCouriers:this.data.couriers[e.detail.value]
  })

  },
  

  next: function () {

    
    if (this.data.chooseCouriers==''){

      wx.showModal({
        title: '提示',
        content: '请选择快递公司',
      })
      return;

    }
    try {
      wx.setStorageSync('chooseCouriers', this.data.chooseCouriers)

      wx.navigateTo({
        url: '../order1/order1',
      })

    } catch (e) {
    }




  }




})