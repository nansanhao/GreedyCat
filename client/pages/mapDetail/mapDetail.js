// pages/mapDetail/mapDetail.js
const config = require('../../config');
const app = getApp();
Page({

    /**
     * 页面的初始数据nickname
    avaterUrl:(用户头像的url)
     */
    data: {
        icons: [
            {
                name: "likes",
                num: 5255,
                activeImageUrl: "../../icons/like.png",
                inactiveImageUrl: "../../icons/likeNot.png",
                isActive: false
            },
            {
                name: "dislikes",
                num: 125,
                activeImageUrl: "../../icons/disLike.png",
                inactiveImageUrl: "../../icons/disLikeNot.png",
                isActive: false
            },
            {
                name: "collection",
                num: 35,
                activeImageUrl: "../../icons/collect.png",
                inactiveImageUrl: "../../icons/collectNot.png",
                isActive: false
            }],
        latitude: 83.111120,
        longitude: 22.111111,
        mapid:"",
        map_name: "",
        description: "这是一段示例文字",
        province:"",
        city:"",
        locality:"",
        create_time:"",
        category:"",
        author_id:"",
        main_image_url:"",
        author:{},
        markers: [{
            latitude: 40.006822,
            longitude: 116.481451,
            title: 'T.I.T 创意园',
            iconPath: "../../icons/location.png",
            width: 40,
            height: 40,
            callout: {
                content: '我是这个气泡',
                display: "ALWAYS",
                fontSize: 12,
                color: '#ffffff',
                bgColor: '#000000',
                padding: 8,
                borderRadius: 4,
            }
        }],
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
    },
    //控件点击事件
    bindcontroltap: function (e) {
        this.mapCtx.moveToLocation()
    },
    //返回首页
    returnTap: function (e) {
        wx.switchTab({
            url: '/pages/index/index'
        })
    },
    //新建评论
    newComment:function(e){
        wx.navigateTo({
            url: '/pages/comment/comment?mapid='+this.options.mapid
        })
    },



    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let mapid = options.mapid;
        wx.request({
            url: config.service.host + "/map/mapDetail",
            data: {
                mapid,
                openId: app.data.userInfo.openId
            },
            success(res) {
                let map = res.data.data.map;
                let icons = that.data.icons;
                icons[0].num = map.num_liked;
                icons[1].num = map.num_disliked;
                icons[2].num = map.num_collected;
                let markers= changeToMaker(map.coordinates);
                let map_center=getMapCenter(markers);
                //设置标题栏title
                wx.setNavigationBarTitle({
                    title: map.map_name
                })

                that.setData({
                    map_name: map.map_name,
                    description: map.description,
                    province: map.province,
                    city: map.city,
                    locality: map.locality,
                    create_time: map.create_time,
                    category: map.category,
                    author_id: map.author_id,
                    author: map.author,
                    comments: map.comments,
                    longitude:map_center.center_longitude,
                    latitude:map_center.center_latitude,
                    icons,
                    markers
                })
            }
        })
        //设置地图控件位置
        wx.getSystemInfo({
            success: function (res) {
                console.log(res)
                let width = res.screenWidth;
                let controls = that.data.controls;
                controls[0].position.left = width - controls[0].position.width * 2;
                that.setData({
                    controls: controls
                })
            },

        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // 使用 wx.createMapContext 获取 map 上下文
        this.mapCtx = wx.createMapContext('myMap')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
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
    onPageScroll: function () {
        this.setData({
            isMenuActive: false
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

