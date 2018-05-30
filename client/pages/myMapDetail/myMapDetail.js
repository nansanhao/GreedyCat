// pages/myMapDetail/myMapDetail.js
const config = require('../../config')
const app = getApp();
Page({
    data: {
        icons: [{
                name: "liked",
                num: 0,
                imageUrl: "../../icons/like.png",
            },
            {
                name: "disliked",
                num: 0,
                imageUrl: "../../icons/dislike.png",
            },
            {
                name: "collected",
                num: 0,
                imageUrl: "../../icons/collect.png",
            }
        ],
        menuItems: [{
                name: "新的觅食处",
                style: "top:-320rpx",
                linkUrl: "#"
            },
            {
                name: "切换地图",
                style: "top:-240rpx",
                linkUrl: "#"
            },
            {
                name: "编辑地图",
                style: "top:-160rpx",
                linkUrl: "/pages/newMap/newMap?mapid=" + app.data.mainMapId
            },
            {
                name: "新建地图",
                style: "top:-80rpx",
                linkUrl: "/pages/newMap/newMap"
            }
        ],
        isMenuActive: false,
        description: "",
        userName: "",
        comments: [],
        markers: [],
        mapid: null,
        author:null,
        // markers: [
        //     {
        //     id: 0,
        //     latitude: 40.006822,
        //     longitude: 116.481451,
        //     title: 'T.I.T 创意园',
        //     width: 40,
        //     height: 40,
        //     callout: {
        //         content: '我是这个气泡',
        //         display: "ALWAYS",
        //         fontSize: 12,
        //         color: '#ffffff',
        //         bgColor: '#000000',
        //         padding: 8,
        //         borderRadius: 4,
        //     },
        // }],
        // polyline: [{
        //     points: [{
        //         longitude: '116.481451',
        //         latitude: '40.006822'
        //     }, {
        //         longitude: '116.487847',
        //         latitude: '40.002607'
        //     }, {
        //         longitude: '116.496507',
        //         latitude: '40.006103'
        //     }],
        //     color: "#228B22",
        //     width: 3
        // }],
        controls: [{
            id: 1,
            iconPath: '../../icons/ui/location.png',
            position: {
                left: 3,
                top: 270,
                width: 40,
                height: 40
            },
            clickable: true
        }],
        longitude: '116.487847',
        latitude: '40.002607'
    },
    //菜单点击事件
    menuTap: function (e) {
        this.setData({
            isMenuActive: !this.data.isMenuActive
        })
        let that = this;
        wx.getSystemInfo({
            success: function (res) {
                console.log(res)
                let width = res.screenWidth;
                let controls = that.data.controls;
                controls[0].position.left = width - controls[0].position.width;
                that.setData({
                    controls: controls
                })
            },
        })
    },
    //控件点击事件
    bindcontroltap:function(e){
        this.mapCtx.moveToLocation()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow(options) {
        this.setData({mapid:app.data.mainMapId})
        if (app.data.mainMapId != null) {
            let that = this
            wx.showNavigationBarLoading()
            wx.showLoading({
                title: '加载中',
                mask:true
            })
            wx.request({
                url: config.service.host + '/map/mapDetail',
                data: {
                    mapid: app.data.mainMapId
                },
                success(res) {
                    let data = that._dataProcess(res.data.data.map)
                    that.setData(data)
                    wx.hideNavigationBarLoading()
                    wx.hideLoading()
                    wx.setNavigationBarTitle({
                        title: res.data.data.map.map_name,
                    })
                    console.log(res)
                }
            })
        }
    },
    
    onLoad(){
        let that = this
        wx.getSystemInfo({ //设置地图控件位置
            success: function (res) {
                console.log(res)
                let width = res.screenWidth;
                let controls = that.data.controls;
                controls[0].position.top = 300 - controls[0].position.height;
                controls[0].position.left = width - controls[0].position.width * 2;
                that.setData({
                    controls: controls
                })
            },

            onReady: function () {
                // 使用 wx.createMapContext 获取 map 上下文
                this.mapCtx = wx.createMapContext('myMap')
            },

        })
    },
        



    onPageScroll() {
        this.setData({
            isMenuActive: false
        })
    },
    _dataProcess(rawData) {
        console.log(rawData)
        let data = {
            mapid : rawData.mapid,
            map_name: rawData.map_name,
            description: rawData.description,
            province: rawData.province,
            city: rawData.city,
            locality: rawData.locality,
            create_time: rawData.create_time,
            category: rawData.category,
            author_id: rawData.author_id,
            author: rawData.author,
            comments: rawData.comments,
            coordinates:rawData.coordinates
        };

        let icons = this.data.icons
        for (let i = 0; i < 3; i++) {
            icons[i].num = rawData['num_' + icons[i].name]
        }
        data.icons = icons

        // this.data.menuItems[2].linkUrl += '?mapid=' + this.options.mapid
        // data.menuItems

        let length = data.coordinates.length
        data.configList = Array.from({
            length
        }, (v, i) => ({
            leftDistance: 0,
            itemId: data.coordinates[i].id
        }))
        return data
    }
})