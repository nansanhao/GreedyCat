// pages/newCoordinate/newCoordinate.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        //textarea数据
        textareaLen: 0,
        textareaMaxLen: 50,
        //map数据
        latitude: 40.006822,
        longitude: 116.481451,
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
        controls: [{
            id: 1,
            iconPath: '../../icons/ui/location.png',
            position: {
                left: 330,
                top: 270,
                width: 40,
                height: 40
            },
            clickable: true
        }],

    },
    //控件点击事件
    bindcontroltap: function (e) {
        this.mapCtx.moveToLocation()
    },
    /**
     * 页面提交事件
     */
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        
        // //向后台发送数据
        // wx.request({
        //     url: config.service.host + "",
        //     method: "POST",
        //     data: data,
        //     success: function (res) {
        //         console.log(res)
        //     }

        // })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        //设置地图控件位置
        wx.getSystemInfo({
            success: function (res) {
                console.log(res)
                let width = res.screenWidth;
                let controls = that.data.controls;
                controls[0].position.top = 300 - controls[0].position.height;
                controls[0].position.left = width - controls[0].position.width;
                that.setData({
                    controls: controls
                })
            },

        })
    },
    /**
     * textarea实时更新字数
     */
    bindTextAreaChange: function (e) {
        var that = this
        var len = parseInt(e.detail.value.length)
        that.setData({ textareaLen: len })
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
    onShareAppMessage: function () {

    }
})