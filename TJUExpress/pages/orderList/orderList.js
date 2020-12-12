const re = require('../../utils/request.js')
var app = getApp()
Page({
  data: {
    "userid":app.globalData.userInfo.userId,
    "list":[{
      Company:"顺丰速运",
      OrderId:"Bq908",
      Sender_name:"Sleepycat",
      Sender_province:"上海",
      Sender_city:"直辖市",
      Sender_region:"杨浦区",
      Sender_detail:"同济大学",
      Rec_name:"DBJ",
      Rec_province:"上海",
      Rec_city:"直辖市",
      Rec_region:"嘉定区",
      Rec_detail:"同济大学",
      status:1
    },
    {
      Company:"申通快递",
      OrderId:"Bq90834",
      Sender_name:"Maya",
      Sender_province:"上海",
      Sender_city:"直辖市",
      Sender_region:"杨浦区",
      Sender_detail:"同济大学",
      Rec_name:"DBJ",
      Rec_province:"上海",
      Rec_city:"直辖市",
      Rec_region:"嘉定区",
      Rec_detail:"同济大学",
      status:1
    },
    {
      Company:"顺丰速运",
      OrderId:"Bq908900",
      Sender_name:"Sleepycat",
      Sender_province:"上海",
      Sender_city:"直辖市",
      Sender_region:"杨浦区",
      Sender_detail:"同济大学",
      Rec_name:"DBJ",
      Rec_province:"上海",
      Rec_city:"直辖市",
      Rec_region:"嘉定区",
      Rec_detail:"同济大学",
      status:1
    }
  ],
    "choose":1,
    "color1":"#7ccefd",
    "color2":"darkgrey",
    "color3":"darkgrey"
  },
  onLoad: function (options) {
    var userid = app.globalData.userInfo.userId
    this.setData({
      userid:userid
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
    var that = this;
    var index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '注意事项',
      content: '确认撤单后不可取消',
      complete:function(){
        var temp= "list["+ index + "].status";
        that.setData({
          [temp]:2
        })
        wx.showToast({
          title: '撤单成功',
          icon: 'success',
          duration: 1500
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

