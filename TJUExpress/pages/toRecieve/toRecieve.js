const re = require('../../utils/request.js')
var app = getApp()
var url1, url2, that, data, listadd;
Page({
  data: {
    "userid":app.globalData.userInfo.userId,
    "list":[],
    "choose":1,
    "color1":"#7ccefd",
    "color2":"darkgrey",
    "color3":"darkgrey"
  },
  onShow: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    // 页面初始化 options为页面跳转所带来的参数
    var userid=app.globalData.userInfo.userId
    var token=app.globalData.token
    var that = this
    wx.request({
      url:'https://www.csystd.cn:9999/user/checkReadyExpress',
      method:'POST',
      data:{
        userID:userid
      },
      header:{
        "Token":token
      },
      success:function(res){
        wx.hideLoading()
        console.log(res.data)
        var list = res.data
        that.setData({
          list:list
        })
      }
    })
  },
  torecieve: function() {
    this.setData({
      choose:1,
      "color1":"#7ccefd",
      "color2":"darkgrey",
      "color3":"darkgrey"
    })
  },
  recieved: function() {
    this.setData({
      choose:2,
      "color2":"#7ccefd",
      "color1":"darkgrey",
      "color3":"darkgrey"
    })
  },
  problem: function() {
    this.setData({
      choose:3,
      "color3":"#7ccefd",
      "color2":"darkgrey",
      "color1":"darkgrey"
    })
  },
  
  //签收监听事件
  qianshou_click:function(e){
    console.log(e);
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id=e.currentTarget.id;
    var token=app.globalData.token
    wx.showModal({
      title: '注意事项',
      content: '确认签收后不可取消',
      complete:function(){
        wx.showLoading({
          title: '正在签收',
        })
        var temp= "list["+ index + "].status";
        that.setData({
          [temp]:0
        })
        console.log(id)
        wx.request({
          url:'https://www.csystd.cn:9999/user/ackExpress',
          method:'POST',
          data:{
            packageID:id
          },
          header:{
            'Token':token
          },
          success:function(res){
            console.log(res.data)
            wx.hideLoading()
            wx.showToast({
              title: '签收成功',
              icon: 'success',
              duration: 1500
            })
          }
        })
        
      }
    })
        
  }
  
})

//请求数据
function queryRequest(url) {
  wx.request({
    url: url,
    data: {},
    method: 'GET',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      // success
      console.log(res.data);
      list = res.data;
      that.setData({
        list: list
      })
    }
  })
}

//下拉加载的请求
function getmoreRequest(url) {
  wx.request({
    url: url,
    data: {},
    method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      // success
      console.log(res.data);
      listadd = res.data;
      list = list.concat(listadd);
      that.setData({
        list: list
      })
      

    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}

//时间戳转换为时间
function timeString(time) {
  var newDate = new Date();
  newDate.setTime(time);
  // console.log(newDate.toLocaleDateString());
  var result = newDate.toLocaleDateString();
  return result;
}

