// pages/newCoordinate/newCoordinate.js

const config = require('../../config')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imagePath:'',
        //textarea数据
        textareaLen: 0,
        textareaMaxLen: 50,
        //map数据
        latitude: 0,
        longitude: 0,
        description: "",
        name:"",
        address:'',
        category: "",
        markers: [],
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
        if(this.options.id) {
            this._setLoadDetail()
        } else {
            this.mapCtx.moveToLocation()
        }
    },
    /**
     * textarea实时更新字数
     */
    bindTextAreaChange: function (e) {
        var that = this
        var len = parseInt(e.detail.value.length)
        that.setData({ textareaLen: len })
    },

    chooseImage: function (e) {
        var that = this;
        wx.chooseImage({
            count: 1,
            success: function (res) {
                that.setData({
                    imagePath: res.tempFilePaths[0]
                });
            }
        })
    },
    _setLoadDetail() {
        let that = this
        wx.request({
            url: config.service.host+'/map/coordinate',
            data:{
                coordinateId:that.options.id
            },
            success(res) {
                let rawData = res.data.data.coordinate
                let data = that._dataProcess(rawData)
                that.setData(data)
            }
        })
    },


    _dataProcess(rawData) {
        let data = {
            name:rawData.name,
            address:rawData.address,
            description:rawData.description,
            latitude:rawData.latitude,
            longitude:rawData.longitude,
            imageUrl:rawData.main_image_url
        }

        return data
    }


   
})