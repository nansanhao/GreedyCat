// pages/mapControl/mapControl.js
const config = require('../../config')
const app = getApp();

Page({


    data: {
        coordinates: [],
        configList: [],
        mapid:null,
    },

    onLoad: function (options) {
        let that = this
        wx.showNavigationBarLoading()
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
            url: config.service.host + '/map/coordinates',
            data: {
                mapid: that.options.mapid
            },
            success(res) {
                let data = that._dataProcess(res.data.data)
                that.setData(data)
                wx.hideNavigationBarLoading()
                wx.hideLoading()
            }
        })
    },

    _dataProcess(rawData){
        let data = {}
        let length = rawData.coordinates.length
        data.mapid = this.options.mapid
        data.coordinates = rawData.coordinates
        data.configList = Array.from({
            length
        }, (v, i) => ({
            leftDistance: 0,
            itemId: rawData.coordinates[i].id
        }))
        return data
    }

    
})

