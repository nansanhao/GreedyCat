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
        

    },
    //控件点击事件
    lockLocation: function (e) {
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
        this.mapCtx = wx.createMapContext('myMap')
    },
    /**
     * textarea实时更新字数
     */
    bindTextAreaChange: function (e) {
        var that = this
        var len = parseInt(e.detail.value.length)
        that.setData({ textareaLen: len })
    },




   
})