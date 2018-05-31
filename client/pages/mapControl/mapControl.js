// pages/mapControl/mapControl.js
const config = require('../../config')
const app = getApp();

Page({


    data: {
        coordinates: [],
        configList: [],
        mapid: null,
    },

    onShow: function (options) {
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

    _dataProcess(rawData) {
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
    },
    onDeleteItem(e) {
        wx.request({
            url: config.service.host + '/map/coordinate',
            method: 'DELETE',
            data: {
                coordinate_id: e.detail.itemId
            }
        })
        let configList = this.data.configList  //删除组件外的list
        let index = configList.findIndex((v, i) => v.itemId == e.detail.itemId)
        console.log(this.data.configList)
        configList.splice(index, 1);
        this.setData({ configList })
    },

    mapSwitch() {
        if (app.data.mainMapId == this.options.mapid) {
            wx.showModal({
                title: '提示',
                content: '当前地图已在使用中',
                confirmColor: "#EB6159",
                showCancel: false
            })
        } else {
            let mapid = this.options.mapid
            wx.showModal({
                title: '提示',
                content: '是否使用当前地图',
                confirmColor: "#EB6159",
                success(res) {
                    if (res.confirm) {
                        wx.request({
                            url: config.service.host + '/user/setMainMap',
                            method: 'POST',
                            data: {
                                open_id: app.data.userInfo.openId,
                                main_mapid: mapid
                            },
                            success() {
                                app.data.mainMapId = mapid;
                                wx.showToast({
                                    icon: 'success',
                                    title: '切换成功',
                                })
                            }
                        })
                    }
                }

            })
        }

    },

    newCoordinate() {
        let mapid = this.data.mapid
        wx.navigateTo({
            url: '/pages/newCoordinate/newCoordinate?mapid=' + mapid,
        })
    },

    deleteMap() {
        let mapid = this.data.mapid
        wx.showModal({
            title: '提示',
            content: '确定删除本地图吗？',
            confirmColor: '#EB6159',
            success(res) {
                if (res.confirm) {
                    wx.request({
                        url: config.service.host + '/map/myMap',
                        methor: 'DELETE',
                        data: {
                            mapid,
                            open_id: app.data.userInfo.openId
                        },
                        success() {
                            wx.showToast({
                                icon:'success',
                                title: '删除成功',
                            })
                            if(mapid==app.data.mainMapId){
                                app.data.mainMapId = null
                            }
                            wx.navigateBack({
                            })
                        }
                    })
                }
            }
        })

    },

    coordinateControl(e) {
        wx.navigateTo({
            url: '/pages/newCoordinate/newCoordinate?id='+e.currentTarget.dataset.id,
        })
    },
    informationManage(){
        wx.navigateTo({
            url: '/pages/newMap/newMap?mapid=' + this.options.mapid,
        })
    }
})

