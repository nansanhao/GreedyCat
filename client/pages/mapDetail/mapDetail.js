// pages/mapDetail/mapDetail.js
const config = require('../../config');
const app = getApp();
Page({

    /**
     * 页面的初始数据nickname
    avaterUrl:(用户头像的url)
     */
    data: {
        icons: [{
            name: "liked",
            num: 0,
            activeImageUrl: "../../icons/like.png",
            inactiveImageUrl: "../../icons/likeNot.png",
            isActive: false
        },
        {
            name: "disliked",
            num: 0,
            activeImageUrl: "../../icons/dislike.png",
            inactiveImageUrl: "../../icons/dislikeNot.png",
            isActive: false
        },
        {
            name: "collected",
            num: 0,
            activeImageUrl: "../../icons/collect.png",
            inactiveImageUrl: "../../icons/collectNot.png",
            isActive: false
        }],
        latitude: 0,
        longitude: 0,
        mapid: "",
        map_name: "",
        description: "这是一段示例文字",
        province: "",
        city: "",
        locality: "",
        create_time: "",
        category: "",
        author_id: "",
        main_image_url: "",
        author: {},
        markers: [],
    },
    //icon点击事件
    iconTap: function (e) {
        let index = e.currentTarget.dataset.index;
        let icons = this.data.icons;
        icons[index].isActive = !icons[index].isActive;
        let change = icons[index].isActive ? 1 : -1;
        icons[index].num = icons[index].num + change;
        this.setData({
            icons: icons
        })
        let data = {
            open_id: app.data.userInfo.openId,
            mapid: this.options.mapid,
            liked: icons[0].isActive,
            disliked: icons[1].isActive,
            collected: icons[2].isActive
        }
        //返回给数据库
        wx.request({
            url: config.service.host + "/user/admiration",
            method: "POST",
            data: data,
            success: function (res) {
                console.log("icons功能回调")
            }
        })
    },
    //控件点击事件
    lockLocation: function (e) {
        console.log(e)
        this.mapCtx.moveToLocation()
    },
    //新建评论
    newComment: function (e) {
        wx.navigateTo({
            url: '/pages/comment/comment?mapid=' + this.options.mapid
        })
    },

    onShow: function () {
        let mapid = this.options.mapid
        let that = this
        wx.request({
            url: config.service.host + '/map/comments',
            data: {
                mapid
            },
            success(res) {
                that.setData({ comments: res.data.data.comments })
            }
        })
        

    },

    onLoad: function (options) {
        this.mapCtx = wx.createMapContext('myMap') //地图组件设置
        let that = this;
        let mapid = options.mapid;
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.showNavigationBarLoading()
        wx.request({
            url: config.service.host + "/map/mapDetail",
            data: {
                mapid,
                openId: app.data.userInfo.openId
            },
            success(res) {
                let data = that._processData(res.data.data.map)
                //设置标题栏title
                wx.setNavigationBarTitle({
                    title: data.map_name
                })
                that.setData(data)
                wx.hideLoading()
                wx.hideNavigationBarLoading()
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

    },
    onShareAppMessage(res) {
        let that = this;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: that.data.map_name,
            path: '/page/mapDetail/mapDetail?mapid=' + that.options.mapid
        }

    },
    /**
     * 页面滚动响应
     */
    onPageScroll() {
        this.setData({
            isMenuActive: false
        })
    },

    _processData(rawData) {
        console.log(rawData)
        let data = {
            mapid: rawData.mapid,
            map_name: rawData.map_name,
            description: rawData.description,
            province: rawData.province,
            city: rawData.city,
            locality: rawData.locality,
            create_time: rawData.create_time,
            category: rawData.category,
            author_id: rawData.author_id,
            author: rawData.author,
        }
        let icons = this.data.icons
        for (let i = 0; i < 3; i++) {
            icons[i].num = rawData['num_' + icons[i].name]
            if (rawData.admiration[0]) {
                icons[i].isActive = !!rawData.admiration[0][icons[i].name]
            }
        }
        data.icons = icons

        let markers = changeToMaker(rawData.coordinates);
        let map_center = getMapCenter(markers);
        data.markers = markers;
        data.longitude = map_center.center_longitude
        data.latitude = map_center.center_latitude

        return data;
    }
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

