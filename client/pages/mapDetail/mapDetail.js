// pages/mapDetail/mapDetail.js
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
                activeImageUrl: "../../icons/icon.png",
                inactiveImageUrl: "../../icons/location.png",
                isActive: true
            },
            {
                name: "dislikes",
                num: 125,
                activeImageUrl: "../../icons/icon.png",
                inactiveImageUrl: "../../icons/location.png",
                isActive: true
            },
            {
                name: "collection",
                num: 35,
                activeImageUrl: "../../icons/icon.png",
                inactiveImageUrl: "../../icons/location.png",
                isActive: true
            }],
        description: "这是一段示例文字",
        userName: "小明",
        comments: [
            { userName: "小红", avaterUrl: "../../icons/icon.png", content: "这是一段评论。" },
            { userName: "小红", avaterUrl: "../../icons/icon.png", content: "这是一段评论。" },
            { userName: "小红", avaterUrl: "../../icons/icon.png", content: "这是一段评论。" },
            { userName: "小红", avaterUrl: "../../icons/icon.png", content: "这是一段评论。" },
            { userName: "小红", avaterUrl: "../../icons/icon.png", content: "这是一段评论。" }
        ],
        latitude: 40.006822,
        longitude: 116.481451,
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
    iconTap: function (e) {
        let index = e.currentTarget.dataset.index;
        let icons = this.data.icons;
        icons[index].isActive = !icons[index].isActive;
        this.setData({
            icons: icons
        })
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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
    onShareAppMessage: function () {

    }
})