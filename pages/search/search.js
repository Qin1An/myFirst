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
      contact: db.RegExp({
        regexp: _this.staticData.inputValue,
        options: 'i'
      })
    },
    {
      address: db.RegExp({
        regexp: _this.staticData.inputValue,
        options: 'i'
      })
    },
      {
       massage: db.RegExp({
          regexp: _this.staticData.inputValue,
          options: 'i'
        })
      }
    ])).get({
      success: function (res) {
        _this.setData({
          list: res.data
        })
      }
    })
  },

  handleInput(e) {
    this.staticData.inputValue=e.detail.value
  },

  handleSearch(){
    this.onLoad()
  },
  handleItemTap(e){
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.currentTarget.id,
    })
  },
    onShareAppMessage: function (res) {
    return {
      title: '宠物交易平台信息搜索',
      path: '/pages/index/index'
    }
  }
})