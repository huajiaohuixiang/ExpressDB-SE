// pages/addr/addr.js
const lk = require('../../utils/Linkage.js');
Page({
  data: {
    provinces: [],
    cities: [],
    districts: [],
    OneCity: [],
    OneDistricts: [],
    provinces_name: '请选择所在省',
    cities_name: '请选择所在市',
    districts_name: '请选择所在区',
    sender_name:'',
    sender_telphone:'',
    sender_address:''
  },
  onLoad: function (options) {
    // 获取省 市 数据
    var provinces = lk.provinces
    var cities = lk.cities
    var districts = lk.districts
    var that = this
    this.setData({
      provinces: provinces,
      cities: cities,
      districts: districts
    })
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              that.setData({
                tempinfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  _province: function (e) {
    var provinces = this.data.provinces
    this.separationCitys(provinces[e.detail.value].AreaCode.substr(0, 2))
    this.setData({
      provinces_name: provinces[e.detail.value].Name,
      cities_name: '请选择',
      districts_name: '请选择',
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
      cities_name: OneCity[e.detail.value].Name,
      districts_name: '请选择',
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
      districts_name: OneDistricts[e.detail.value].Name,
    })
  },
  formSubmit: function (e) {
    var params = e.detail.value
    params.sender_province_name = this.data.provinces_name
    params.sender_city_name = this.data.cities_name
    params.sender_district_name = this.data.districts_name
    console.log('params', params)
    if (params.sender_name == "" || params.sender_telphone == "" || params.sender_address == "" || params.item_name == "") {
      wx.showModal({
        title: '提示',
        content: '请填写完整的信息',
      })
      return
    }


  },
  _submit: function(){
    wx.showModal({
        title: '提示',
        content: '修改信息成功',
    }),
    wx.navigateTo({
      url:'../addr/addr'
    })
  }
})