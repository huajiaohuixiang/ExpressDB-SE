const re = require('../../utils/request.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseCouriers: '',
    recipient: '',
    sender: '',
    Orderdate:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.userInfo.userId)
    var that = this
    wx.getStorage({
      key: 'chooseCouriers',
      success: function (res) {
        console.log(res.data)
        that.setData({ chooseCouriers: res.data })
      }
    })
    wx.getStorage({
      key: 'recipient',
      success: function (res) {
        console.log(res.data)
        that.setData({ recipient: res.data })

      }
    })
    wx.getStorage({
      key: 'sender',
      success: function (res) {
        console.log(res.data)
        that.setData({ sender: res.data })
      }
    })
  },
  date:function(e){
    var orderdate = e.detail.value
    this.setData({
      Orderdate:orderdate
    })
  },
  com: function (e) {
    var token = app.globalData.token
    var params = this.mergeJsonObject(this.data.recipient, this.data.sender)
    var company=this.data.chooseCouriers
    console.log('company:'+company)
    var senderphone=app.globalData.userInfo.userId
    var sendername=params.sender_name
    var senderaddr=params.sender_province_name+params.sender_city_name+params.sender_district_name+params.sender_address
    var recphone=params.receiver_telphone
    var recname=params.receiver_name
    var recaddr=params.receiver_province_name+params.receiver_city_name+params.receiver_district_name+params.receiver_address
    var OrderDate=this.data.Orderdate

    wx.showModal({
      title: '注意事项',
      content: '下单后,快递员会在预约时间内上门取件,请保持手机开机,如果在快递员联系你之前不想寄了,请在我的寄件订单中及时取消！',
      complete: function () {
        console.log("senderphone:"+senderphone)
        console.log("orderDate:"+OrderDate)
        wx.showLoading({
          title: '下单中',
        })
        wx.request({
          url: 'https://www.csystd.cn:9999/user/addOrder',
          method:'POST',
          data:{
            senderPhone:senderphone,
            company:company,
            senderName:sendername,
            senderAddress:senderaddr,
            receiverName:recname,
            receiverPhone:recphone,
            receiverAddress:recaddr,
            orderDate:OrderDate
          },
          header:{
            'Token':token
          },
          success:function(res){
            wx.hideLoading()
            console.log(res.data)
            var orderid=res.data
            wx.showModal({
              title: '下单成功',
              content:'您的订单编号是'+orderid,
              complete:function(){
                wx.switchTab({
                  url: '../index/index',
                })
              }
              
            })
          }
        })
      }
    })
  },
  back: function () {
    wx.navigateBack({
      delta: 1
    })
  },


  mergeJsonObject(jsonbject1, jsonbject2) {
    var resultJsonObject = {};
    for (var attr in jsonbject1) {
      resultJsonObject[attr] = jsonbject1[attr];
    }
    for (var attr in jsonbject2) {
      resultJsonObject[attr] = jsonbject2[attr];
    }

    return resultJsonObject;
  }



})