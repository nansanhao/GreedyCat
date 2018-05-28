// pages/myMapDetail/myMapDetail.js
const config = require('../../config')
const app = getApp();
Page({
    data: {
        icons: [
            {
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
            }],
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
        }],
        isMenuActive: false,
        description: "",
        userName: "",
        comments: [],
        markers:[],
        mapid : null,
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
        polyline: [{
            points: [{
                longitude: '116.481451',
                latitude: '40.006822'
            }, {
                longitude: '116.487847',
                latitude: '40.002607'
            }, {
                longitude: '116.496507',
                latitude: '40.006103'
            }],
            color: "#228B22",
            width: 3
        }],
        controls: [{
            id: 1,
            iconPath: '../../icons/icon.png',
            position: {
                left: 350,
                top: 270,
                width: 20,
                height: 20
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
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        if (app.data.mainMapId != null) {
            let that = this
            wx.request({
                url: config.service.host + '/map/mapDetail',
                data: {
                    mapid: app.data.mainMapId
                },
                success(res) {
                    let data = that._dataProcess(res.data.data.map)
                    that.setData(data)
                    console.log(res)
                }
            })
        }

    },


    onPageScroll() {
        this.setData({
            isMenuActive: false
        })
    },
    _dataProcess(rawData) {
        let data = {};
        data.comments = rawData.comments;
        data.icons = this.data.icons
        for (let i = 0; i < 3; i++) {
            data.icons[i].num = rawData['num_' + data.icons[i].name]
        }
        data.description = rawData.description
        data.authorName = rawData.author.nickName
        data.coordinates = rawData.coordinates
        // this.data.menuItems[2].linkUrl += '?mapid=' + this.options.mapid
        data.menuItems 
        let length = data.coordinates.length
        data.configList = Array.from({ length }, (v, i) => ({ leftDistance: 0, itemId: data.coordinates[i].id }))
        return data
    }
})