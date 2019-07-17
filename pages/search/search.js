Page({
  data:{
    list: []
  },

  staticData:{
    inputValue:""
  },

  onLoad () {
    const _this = this;
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('publish').where(_.or([
      {
      _openid: 'oi6zj5F8WfeS22bz8DVZSZ8nOzss', // 填入当前用户 openid
      contact: db.RegExp({
        regexp: _this.staticData.inputValue,
        options: 'i'
      })
    },
    {
      _openid: 'oi6zj5F8WfeS22bz8DVZSZ8nOzss', // 填入当前用户 openid
      address: db.RegExp({
        regexp: _this.staticData.inputValue,
        options: 'i'
      })
    },
      {
        _openid: 'oi6zj5F8WfeS22bz8DVZSZ8nOzss', // 填入当前用户 openid
       massage: db.RegExp({
          regexp: _this.staticData.inputValue,
          options: 'i'
        })
      }
    ])).get({
      success: function (res) {
        console.log(res)
        _this.setData({
          list: res.data
        })
      }
    })
  },

  handleInput(e) {
    console.log(e);
    this.staticData.inputValue=e.detail.value
  },

  handleSearch(){
    this.onLoad()
  },
  handleItemTap(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.id,
    })
  }
})