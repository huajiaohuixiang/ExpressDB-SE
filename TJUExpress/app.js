//app.js
App({
  globalData: {
    login:0,
    userInfo:{
      userId:"",
      userName:"",
      sex:"",
      province:"",
      city:"",
      region:"",
      detail:""
    }
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    console.log("准备请求");
    wx.request({
      
      url: 'https://huajiao.site:8089/test', //路由
      data:{   //数据
        
      },
      method:"GET",//请求方法
      header:{ //请求头
        "content-type":"application/json"
      },
      success(e){ //回调
          //e为后台返回的值
        console.log(e.data)
      }
    })
    
  },
  
})