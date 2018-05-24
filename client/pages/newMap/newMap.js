// pages/newMap/newMap.js

const config = require('../../config')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        in: true,
        location:["北京市","北京市","东城区"],
        textareaLen:0,
        textareaMaxLen:50,
        tags: [
            { tagName: "日韩料理", isChoosed: false },
            { tagName: "西式简餐", isChoosed: false },
            { tagName: "川湘菜", isChoosed: false },
            { tagName: "东南亚风情", isChoosed: false },
            { tagName: "下午茶甜点", isChoosed: false },
            { tagName: "特色私房", isChoosed: false },
            { tagName: "养生早点", isChoosed: false },
            { tagName: "简约小食", isChoosed: false },
            { tagName: "其他", isChoosed: false }],
    },
    toggleTagState: function (e) {
        let obj = {}
        let index = e.currentTarget.id
        let value = this.data.tags[index].isChoosed
        let key = "tags[" + index + "].isChoosed"
        obj[key] = !value
        this.setData(obj)

    },
    /**
     * 页面提交事件
     */
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        let newMap = e.detail.value
        let openId=getApp().data.userInfo.openId
        let data={
            openId:openId,
            map:{
                mapName:newMap.mapName,
                description: newMap.description,
                province:newMap.location[0],
                city: newMap.location[1],
                locality: newMap.location[2],
                isPublic: newMap.isPublic
            }
        };
        console.log(data)
        //向后台发送数据
        wx.request({
            url: config.service.host+"/map/newMap",
            method:"POST",
            data:data,
            success:function (res){
                console.log(res)
            }
            
        })
    },
    /**
     * picker发生改变
     */
    bindPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            location: e.detail.value
        })
    },
    /**
     * textarea实时更新字数
     */
    bindTextAreaChange:function(e) {
        var that = this
        var len = parseInt(e.detail.value.length)
        that.setData({ textareaLen: len })
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