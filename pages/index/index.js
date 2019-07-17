 const app = getApp();

Page({
  data: {
    longitude: "",
    latitude: "",
    markers: [],
    controls: [{
      id: 1,
      iconPath: '/resources/maplog.png',
      position: {
        left: (app.gl.windowWidth/2)-13,
        top: ((app.gl.windowHeight-40) / 2)-34,
        width: 26,
        height: 34
      },
      clickable: false
      }, {
        id: 2,
        iconPath: '/resources/maplogs.png',
        position: {
          left: 30,
          top: app.gl.windowHeight  - 90,
          width: 21,
          height: 21
        },
        clickable: true
    }]
  },

  onShow: function() {
    const _this=this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        _this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })

  const db = wx.cloud.database()
    db.collection('publish').where({
      _openid: 'oi6zj5F8WfeS22bz8DVZSZ8nOzss' // 填入当前用户 openid
    }).get({
      success: function (res) {
        console.log(res.data)
        const arr = res.data.map((value,index)=> {
          return {
            iconPath: "/resources/"+ value.type +".png",
              id: value._id,
              latitude: value.latitude,
              longitude: value.longitude,
              width: 40,
              height: 40
          }
          
        })
        console.log(arr);
        _this.setData({
          markers: arr
        })
      }
    })
  },

  onReady:function() {
    this.mapCtx = wx.createMapContext('myMap')
  },

  controltap: function() {
    this.mapCtx.moveToLocation()
  },

  handleMarkerTap(e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/detail/detail?id='+ e.markerId
    })
  },


  onShareAppMessage: function (res) {
    return {
      title: '宠物交易平台',
      path: '/pages/index/index'
    }
  }
})
