// 获取快递公司信息
const baseUrl = 'http://127.0.0.1:8080';
function getKuaidi(callback) {
  console.log('获取快递公司信息');
  wx.request({
    url:'https://api.weixin.qq.com/cgi-bin/express/business/delivery/getall?access_token=ACCESS_TOKEN',
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callback(res.data);
      console.log('获取快递公司信息成功');
    },
    fail: function (err) {
      console.log('获取快递公司信息失败');
      console.log(err);
      ShowModal(err);
    }
  })
}

// 下单
function placeTheOrder(url,callback) {
  console.log('下单')
  wx.request({
    // 下单的地址，加上传进来的url  
    
    url: '' + url,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      callback(res.data)
    },
    fail: function (err) {
      ShowModal()
    }
  })
}



function ShowModal(err) {
  wx.showModal({
    title: '提示',
    content: '请求失败，请联系客服',
  })
}
module.exports = {
  test: function () {
    console.log('test')
  },
  getKuaidi: getKuaidi,
  placeTheOrder: placeTheOrder
}

