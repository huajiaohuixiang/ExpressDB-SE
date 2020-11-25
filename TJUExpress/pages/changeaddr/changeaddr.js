
const lk = require('../../utils/Linkage.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      "nickname":"Sleepycat",
      "phonenum": "13127525101",
      "province": "上海",
      "city" :"直辖市",
      "region": "嘉定区",
      "detail": "安亭镇曹安公路4800号同济大学"
    },
    nickname:'',
    phonenum:'',
    province:'',
    city:'',
    region:'',
    detail:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var provinces = lk.provinces
    var cities = lk.cities
    var districts = lk.districts
    this.setData({
      
    })
  },
  changeinfo: function(){
    wx.navigateTo({
      url: '../addr/addr',
    })
  }
})