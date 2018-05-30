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
                linkUrl: "/pages/newCoordinate/newCoordinate"
            },
            {
                name: "切换地图",
                style: "top:-240rpx",
                linkUrl: "/pages/myMaps/myMaps?lockDelete=1&choice=0"
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
        city:'',
        locality:'',
        comments: [],
        markers: [],
        mapid: null,
        author:null,
        markers:[],
        longitude: 0,
        latitude: 0,
    },
    //菜单点击事件
    menuTap: function (e) {
        this.setData({
            isMenuActive: !this.data.isMenuActive
        })
        let that = this;
    },
    //控件点击事件
    lockLocation:function(e){
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
                    if (that.data.markers[0]) {
                        that.setData({
                            longitude: that.data.markers[0].longitude,
                            latitude: that.data.markers[0].latitude,
                        })
                    } else {
                        that.mapCtx.moveToLocation()
                    }
                }
            })
        }
    },
    
    onLoad(){
        let that = this
        this.mapCtx = wx.createMapContext('myMap')

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
        };

        let icons = this.data.icons
        for (let i = 0; i < 3; i++) {
            icons[i].num = rawData['num_' + icons[i].name]
        }
        data.icons = icons
        let length = rawData.coordinates.length
        data.configList = Array.from({
            length
        }, (v, i) => ({
            leftDistance: 0,
            itemId: rawData.coordinates[i].id
        }))

        let markers = changeToMaker(rawData.coordinates);
        let map_center = getMapCenter(markers);
        data.markers = markers;
        data.longitude = map_center.center_longitude
        data.latitude = map_center.center_latitude

        return data
    },
    //控件点击事件
    lockLocation: function (e) {
        console.log(e)
        this.mapCtx.moveToLocation()
    },
})


function changeToMaker(coordinates) {
    let callout = {
        content: '我是这个气泡',
        display: "ALWAYS",
        fontSize: 12,
        color: '#ffffff',
        bgColor: '#000000',
        padding: 8,
        borderRadius: 4,
    };
    let iconPath = "../../icons/location.png";
    let width = 40;
    let height = 40;
    let markers = coordinates.map(function (marker, index) {
        marker.iconPath = iconPath;
        marker.width = width;
        marker.height = height;
        marker.title = marker.name;
        marker.callout = callout;
        marker.callout.content = marker.name;
        delete marker.name;
        return marker;
    })
    return markers;
}
function getMapCenter(markers) {
    let center_latitude = 0;
    let center_longitude = 0;
    let num_point = markers.length;
    markers.forEach(function (points, index) {
        center_latitude += points.latitude / num_point;
        center_longitude += points.longitude / num_point;
    })
    let markers_center = {
        center_latitude,
        center_longitude
    }
    return markers_center;
}
