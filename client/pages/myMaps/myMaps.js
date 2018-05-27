// pages/myMaps/myMaps.js
const config = require('../../config')
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        startX: 0,//滑动开始的x坐标
        delBtnWidth: 100,//删除按钮的宽
    },
    //主页面处理删除事件的数据同步
    deleteItem: function (eventDetail){
    
        let mapList=eventDetail.detail.mapList
        this.setData({
            mapList
        });
    },

    onLoad: function (options) {
        let that = this
        wx.request({
            url: config.service.host + "/user/mapList",
            data:{
                openId:app.data.userInfo.openId
            },
            success(res) {
                that.setData({
                    mapList:res.data.data.maps
                })
            }

        })
    },

})