const re = require('../../utils/request.js')
var app = getApp()
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
    var token = app.globalData.token
    var userid = app.globalData.userInfo.userId
    var that=this
    this.setData({
      userid:userid
    })
    wx.request({
      url:'https://www.csystd.cn:9999/user/checkMyOrder',
      method:'POST',
      data:{
        userID:userid
      },
      header:{
        'Token':token
      },
      success:function(res){
        wx.hideLoading()
        console.log(res.data)
        var list=res.data
        that.setData({
          list:list
        })
      }
    })
  },
  under: function() {
    this.setData({
      choose:1,
      "color1":"#7ccefd",
      "color2":"darkgrey",
      "color3":"darkgrey"
    })
  },
  done: function() {
    this.setData({
      choose:2,
      "color2":"#7ccefd",
      "color1":"darkgrey",
      "color3":"darkgrey"
    })
  },
  cancel: function() {
    this.setData({
      choose:3,
      "color3":"#7ccefd",
      "color2":"darkgrey",
      "color1":"darkgrey"
    })
  },
  
  lower: function (e) {
    url2 = "" + getApp().globalData.openId.data + "&pageSize=10&currentPage="+parseInt(url1.charAt(str.length - 1))+1;
    getmoreRequest(url2);
  },
  //撤单监听事件
  cancel_click:function(e){
    var token=app.globalData.token
    var that = this;
    var lt = this.list; 
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.id;
    wx.showModal({
      title: '注意事项',
      content: '确认撤单后不可取消',
      complete:function(){
        wx.showLoading({
          title: '正在撤单',
        })
        var temp= "list["+ index + "].intStatus";
        that.setData({
          [temp]:2
        })
       
        console.log(id);
        wx.request({
          url: 'https://www.csystd.cn:9999/user/quitOrder',
          method:'POST',
          data:{
            orderID:id
          },
          header:{
            'Token':token
          },
          success:function(res){
            wx.hideLoading()
            console.log(res.data)
            wx.showToast({
              title: '撤单成功',
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
  var that = this
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

