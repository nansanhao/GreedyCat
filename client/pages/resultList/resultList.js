// pages/resultList/resultList.js

const config = require('../../config')
Page({

    data: {
        tabs: ["匹配地图", "匹配店铺"],
        activeIndex: 0,
        sliderOffset: 0,

        //mapList
        maps: [],
        mapOffset: 0,
        mapIsEnd: false,
        coordinates: [],
        coordinateOffset: 0,
        coordinateIsEnd: false,
    },

    onLoad(){

        this._loadList('map')
        this._loadList('coordinate')
    },
    onReachBottom() {
        let list = ['map', 'coordinate']
        list = list[this.data.activeIndex]
        if (!this.data[list + 'IsEnd']) {
            this._loadList(list)
        }
    },
    //navbar切换部分
    tabClick(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.dataset.index
        });
    },

    //获得列表
    _loadList(list, limit = 5) {
        wx.showNavigationBarLoading()
        wx.showLoading({
            title: '加载中',
        })
        let that = this
        let data = this.options
        data.order = 'time'
        data.offset = this.data[list+'Offset']
        wx.request({
            url: config.service.host + '/map/' + list + 'List',
            data,
            success(res) {
                let result = {}
                result[list + 's'] = that.data[list + 's'].concat(res.data.data[list + 's'])
                result[list + 'Offset'] = that.data[list + 'Offset'] + res.data.data[list + 's'].length
                if (res.data.data[list+'s'].length < limit) {
                    result[list + 'IsEnd'] = true
                }
                that.setData(result)
                wx.hideNavigationBarLoading()
                wx.hideLoading()
            }
        })
    },
})