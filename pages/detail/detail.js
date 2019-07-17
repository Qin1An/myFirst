Page({
  data: {
    address:"",
    type:"",
    massage:"",
    contact:""
  },

  onLoad(options) {
    console.log(options);
    this.getDetailInfo(options.id);
  },

  getDetailInfo(id) {
    const _this = this;
    const db = wx.cloud.database()
    db.collection('publish').where({
      _openid: 'oi6zj5F8WfeS22bz8DVZSZ8nOzss', // 填入当前用户 openid
      _id: id
    }).get({
      success: function (res) {
        console.log(res);
        _this.setData({
          address: res.data[0].address,
          type: res.data[0].type === "buy" ? "购买" : "出售",
          massage: res.data[0].massage,
          contact: res.data[0].contact
        })
      }
    })
  }

})