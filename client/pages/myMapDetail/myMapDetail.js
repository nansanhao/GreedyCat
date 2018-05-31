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
        menuItems: [],
        isMenuActive: false,
        description: "",
        userName: "",
        comments: [],
        markers: [],
        mapid: null,
        author: null,
        markers: [],
        city: '',
        locality: '',
        latitude:0,
        longitude:0
    },
    //菜单点击事件
    menuTap: function (e) {
        this.setData({
            isMenuActive: !this.data.isMenuActive
        })
    },
    //控件点击事件
    lockLocation: function (e) {
        this.mapCtx.moveToLocation()
    },

    onDeleteItem(e) {
        wx.request({
            url: config.service.host +'/map/coordinate',
            method:'DELETE',
            data:{
                coordinate_id: e.detail.itemId
            }
        })
        let configList = this.data.configList  //删除组件外的list
        let index = configList.findIndex((v,i)=>v.itemId==e.detail.itemId)
        console.log(this.data.configList)
        configList.splice(index, 1);
        this.setData({configList})
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onShow(options) {
        this.setData({ mapid: app.data.mainMapId })
        if (app.data.mainMapId != null) {
            let that = this
            wx.showNavigationBarLoading()
            wx.showLoading({
                title: '加载中',
                mask: true
            })
            wx.request({
                url: config.service.host + '/map/mapDetail',
                data: {
                    mapid: app.data.mainMapId
                },
                success(res) {
                    let data = that._dataProcess(res.data.data.map)
                    that.setData(data)
                    if (!data.latitude&&!data.longitude) {
                        that.mapCtx.moveToLocation()
                    }
                    
                    wx.setNavigationBarTitle({
                        title: res.data.data.map.map_name,
                    })
                    wx.hideNavigationBarLoading()
                    wx.hideLoading()
                    console.log(res)
                }
            })
        }
    },

    onLoad() {
        let menuItems = _getMenuItems()
        this.setData({ menuItems })
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
    navigateToDetail(e) {
        wx.navigateTo({
            url: '/pages/shopDetail/shopDetail?id='+e.target.dataset.id,
        })
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

function _getMenuItems() {
    return [{
        name: "新的觅食处",
        style: "top:-320rpx",
        linkUrl: "/pages/newCoordinate/newCoordinate?mapid=" + app.data.mainMapId
    },
    {
        name: "切换地图",
        style: "top:-240rpx",
        linkUrl: "/pages/myMaps/myMaps?choice=0&lockDelete=1"
    },
    {
        name: "管理地图",
        style: "top:-160rpx",
        linkUrl: "/pages/mapControl/mapControl?mapid=" + app.data.mainMapId
    },
    {
        name: "新建地图",
        style: "top:-80rpx",
        linkUrl: "/pages/newMap/newMap"
    }
    ]
}