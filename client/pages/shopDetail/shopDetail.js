// pages/shopDetail/shopDetail.js
const config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {

      name:" ",
      description: " ",
      address:' ',
      imageUrl:null
  
  },


  onLoad: function (options) {
    let that = this
    wx.request({
        url: config.service.host + '/map/coordinate',
        data:{
            coordinateId:this.options.id
        },
        success(res){
            let rawData = res.data.data.coordinate
            console.log(rawData)
            that.setData({
                description : rawData.description,
                name : rawData.name ,
                address : rawData.address ,
                mapid : rawData.mapid,
                imageUrl : rawData.main_image_url
            })
        }
    })
  },


})