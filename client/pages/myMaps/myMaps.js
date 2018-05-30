// pages/myMaps/myMaps.js
const config = require('../../config')
const app = getApp()
Page({

    data : {
        mapList:[],
        lockDelete:false
    },
    //主页面处理删除事件的数据同步
    onDeleteItem(e) {
        let choice = ['map/myMap', 'user/collectedMap']
        choice = choice[this.options.choice]
        wx.request({
            url: config.service.host + choice,
            method: 'DELETE',
            data: {
                open_id: app.data.userInfo.openId,
                mapid:e.detail.itemId
            }
        })
    },

    onLoad: function (options) {
        let that = this
        let lockDelete = !!this.options.lockDelete
        let choiceStorage = this.options.choice
        this.setData({ lockDelete ,choice:choiceStorage})
        let choice = ['mapList','collectedMapList']
        choice = choice[choiceStorage]
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
            url: config.service.host + "/user/"+choice,
            data:{
                openId:app.data.userInfo.openId
            },
            success(res) {
                let length = res.data.data.maps.length
                let mapList = res.data.data.maps
                that._setConfigList(length, mapList)
                that.setData({
                    mapList:res.data.data.maps
                })
                wx.hideLoading()
            }

        })
    },
    onTap(e){
        let choice = this.options.choice
        if(choice == 0 ){
            wx.switchTab({
                url: '../myMapDetail/myMapDetail',
            })
        }

    },
    _setConfigList(length, list) {
        let configList = Array.from({ length }, (v, i) => ({ leftDistance: 0, itemId: list[i].mapid }))
        this.setData({
            list: configList
        })
    },
    chooseMap(e) {
        console.log('test')
        wx.request({
            url: config.service.host +'/user/setMainMap',
            method:'POST',
            data:{
                open_id: app.data.userInfo.openId,
                main_mapid: e.target.dataset.id
            },
            success(res) {
                app.data.mainMapId = e.target.dataset.id,
                wx.navigateBack({})
            }
        })
    }
})