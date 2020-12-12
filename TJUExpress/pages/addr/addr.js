// pages/addr/addr.js
var app = getApp()
const lk = require('../../utils/Linkage.js');
Page({
  data: {
    provinces: [],
    cities: [],
    districts: [],
    OneCity: [],
    OneDistricts: [],
    province:"请选择",
    city:"",
    region: "",
    username:"",
    phone:"",
    detail:""
  },
  onLoad: function (options) {
    // 获取省 市 数据
    var provinces = lk.provinces
    var cities = lk.cities
    var districts = lk.districts
    var username = app.globalData.userInfo.userName
    var phone = app.globalData.userInfo.phone
    var province = app.globalData.userInfo.province
    var city = app.globalData.userInfo.city
    var region = app.globalData.userInfo.region
    var detail = app.globalData.userInfo.datail
    this.setData({
      username:username,
      phone:phone,
      province:province,
      city:city,
      region:region,
      detail:detail,
      provinces: provinces,
      cities: cities,
      districts: districts
    })
    if(province==""){
      this.setData({
        province:"请选择"
      })
    }
    
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
  _detail:function(e){
    this.setData({
      detail:e.detail.value
    })
  },
  _province: function (e) {
    var provinces = this.data.provinces
    this.separationCitys(provinces[e.detail.value].AreaCode.substr(0, 2))
    this.setData({
      province: provinces[e.detail.value].Name,
      city: '请选择',
      region: '请选择',
    })
  },
  separationCitys(id) {
    var cities = this.data.cities
    var OneCity = []
    for (var i of cities) {
      if (i.AreaCode.substr(0, 2) == id) {
        OneCity.push(i)
      }
    }
    this.setData({
      OneCity: OneCity
    })
  },
  _city: function (e) {
    var OneCity = this.data.OneCity
    this.separationDistricts(OneCity[e.detail.value].AreaCode.substr(0, 4))
    this.setData({
      city: OneCity[e.detail.value].Name,
      region: '请选择',
    })
  },
  separationDistricts(id) {
    var districts = this.data.districts
    var OneDistricts = []
    for (var i of districts) {
      if (i.AreaCode.substr(0, 4) == id) {
        OneDistricts.push(i)
      }
    }
    this.setData({
      OneDistricts: OneDistricts
    })
  },
  _area: function (e) {
    var OneDistricts = this.data.OneDistricts
    this.setData({
      region: OneDistricts[e.detail.value].Name,
    })
  },
  formSubmit: function (e) {
    var params = e.detail.value
    params.sender_name = this.data.username
    params.sender_telphone = this.data.phone
    params.sender_address = this.data.detail
    params.sender_province_name = this.data.province
    params.sender_city_name = this.data.city
    params.sender_district_name = this.data.region
    console.log('params', params)
    if (params.sender_name == "" || params.sender_telphone == "" || params.sender_address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写完整的信息',
      })
      return
    }
    wx.showModal({
        title: '提示',
        content: '修改信息成功',
    }),
    app.globalData.userInfo.userName=this.data.username
    app.globalData.userInfo.phone=this.data.phone
    app.globalData.userInfo.province=this.data.province
    app.globalData.userInfo.city=this.data.city
    app.globalData.userInfo.region=this.data.region
    app.globalData.userInfo.datail=this.data.detail
    wx.navigateTo({
      url:'../userdetail/userdetail'
    })

  },
  
})