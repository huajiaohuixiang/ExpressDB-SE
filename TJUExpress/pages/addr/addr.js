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
    province:"",
    city:"",
    region: "",
    username:"",
    detail:""
  },
  onLoad: function (options) {
    // 获取省 市 数据
    var provinces = lk.provinces
    var cities = lk.cities
    var districts = lk.districts
    var username = app.globalData.userInfo.userName
    var province = app.globalData.userInfo.province
    var city = app.globalData.userInfo.city
    var region = app.globalData.userInfo.region
    var detail = app.globalData.userInfo.detail
    this.setData({
      username:username,
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
    var token = app.globalData.token
    var userid = app.globalData.userInfo.userId
    console.log(userid)
    var params = e.detail.value
    params.sender_name = this.data.username
    params.sender_address = this.data.detail
    params.sender_province_name = this.data.province
    params.sender_city_name = this.data.city
    params.sender_district_name = this.data.region
    console.log('params', params)
    if (params.sender_name == "" || params.sender_address == "") {
      wx.showModal({
        title: '提示',
        content: '请填写完整的信息',
      })
      return
    }
    wx.showLoading({
      title: '正在提交',
    })
    wx.request({
      url: 'https://www.csystd.cn:9999/user/updateUserInfo',
      method:'POST',
      data:{
        userID:userid,
        name:params.sender_name,
        province:params.sender_province_name,
        city:params.sender_city_name,
        region:params.sender_district_name,
        detail:params.sender_address
      },
      header:{
        'Token':token
      },
      success:function(res){
        console.log(res.data)
        wx.hideLoading()
        wx.showModal({
            title: '提示',
            content: '修改信息成功',
            complete:function(){
              app.globalData.userInfo.userName=params.sender_name
              app.globalData.userInfo.province=params.sender_province_name
              app.globalData.userInfo.city=params.sender_city_name
              app.globalData.userInfo.region=params.sender_district_name
              app.globalData.userInfo.detail=params.sender_address
              wx.navigateBack({
                delta: 1
              })
            }
        })

      }
    })
        
          

  },
  
})