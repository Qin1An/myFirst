Page({
  data:{
    address:"点击选择，要勾选哦~",
    success:false
  },

  saveAdress:{
    type: "buy"
  },

  chickAdress() {
    const _this=this;
    wx.chooseLocation({
      success: function(res) {
        Object.assign(_this.saveAdress, {
          latitude: res.latitude,
          longitude: res.longitude
        });
        _this.setData({
          address: res.address
        })
      }
    })
  },

  handleTypeChange(e) {
    this.saveAdress.type = e.detail.value;
  },

  handleContactChange(e){
    this.saveAdress.contact = e.detail.value;
  },

  handleMassageChange(e){
    this.saveAdress.massage = e.detail.value;
  },

  handleSumbit(){
    const _this=this;
    if (this.data.address ==="点击选择，要勾选哦~" || !this.data.address){
      wx.showToast({
        title: '请填写地址',
        icon: 'loading',
        duration: 2000
      })
      return 0;
    }
    if(!this.saveAdress.contact){
      wx.showToast({
        title: '请填写说明',
        icon: 'loading',
        duration: 2000
      })
      return 0;
    }
    if (!this.saveAdress.massage) {
      wx.showToast({
        title: '请填写联系方式',
        icon: 'loading',
        duration: 2000
      })
      return 0;
    }

    const data = Object.assign({},this.saveAdress,{
      address:this.data.address
    })
    
      // {
      //   address:this.data.address,
      //   latitude:this.saveAdress.latitude,
      //   longitude:this.saveAdress.longitude,
      //   message:this.saveAdress.massage,
      //   contact:this.saveAdress.contact,
      //   type: this.saveAdress.type
      // },
      //比较65行处的代码。用object.assign讲this.saveAdress中的数据全部导入data

    const db = wx.cloud.database()
    db.collection('publish').add({
      // data 字段表示需新增的 JSON 数据
      data: data,
      success: function (res) {
        wx.showToast({ 
          title: '发布成功', 
          icon: 'success', 
          duration: 2000 
        }) 
        _this.setData({ 
          success:true 
        })
      },
      fail: console.error
    })
  },

  handleBack(){
    wx.navigateBack({
      
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: '宠物交易平台信息发布',
      path: '/pages/index/index'
    }
  }
})
