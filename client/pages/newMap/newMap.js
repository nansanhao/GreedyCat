// pages/newMap/newMap.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        in: true,
        textareaLen:0,
        textareaMaxLen:50,
        tags: [
            { tagName: "美食", isChoosed: false },
            { tagName: "旅游", isChoosed: false },
            { tagName: "攻略", isChoosed: false },
            { tagName: "美食", isChoosed: false },
            { tagName: "日料", isChoosed: false },
            { tagName: "旅游", isChoosed: false },
            { tagName: "日料", isChoosed: false },
            { tagName: "美食", isChoosed: false },
            { tagName: "攻略", isChoosed: false },
            { tagName: "美食", isChoosed: false },
            { tagName: "美食", isChoosed: false }],
    },
    toggleTagState: function (e) {
        let obj = {}
        let index = e.currentTarget.id
        let value = this.data.tags[index].isChoosed
        let key = "tags[" + index + "].isChoosed"
        obj[key] = !value
        this.setData(obj)

    }
    ,
    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        wx.request({
            url: config.host,
        })
    },
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