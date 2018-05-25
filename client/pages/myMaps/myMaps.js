// pages/myMaps/myMaps.js
const config = require('../../config')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        startX: 0,//滑动开始的x坐标
        delBtnWidth: 100,//删除按钮的宽
        mapList: [{
            id: "sadfsadfasfasd fsad sad sd",
            likes: 10,
            dislikes: 10,
            collections: 10,
            comments: 10,
            mapName: "日本料理",
            description: "日本料理，主要分为两大类『日本和食』和『日本洋食』。 [1]  当提到日本料理时，许多人会联想到寿司、生鱼片，这些日本人自己发明的食物就是『和食』",
            city: "武汉",
            locality: "江汉区",
            category: 1,
            txtStyle: "",//用来滑动删除使用的字段
            imgUrl:"../../icons/category/Japanese.png",
            linkUrl:"/pages/mapDetail/mapDetail"
        },
        {
            id: "sadfsadfasfasd fs sad sd",
            likes: 10,
            dislikes: 10,
            collections: 10,
            comments: 10,
            mapName: "日本料理",
            description: "日本料理，主要分为两大类『日本和食』和『日本洋食』。 [1]  当提到日本料理时，许多人会联想到寿司、生鱼片，这些日本人自己发明的食物就是『和食』",
            city: "武汉",
            locality: "江汉区",
            category: 1,
            txtStyle: "",
            imgUrl: "../../icons/category/Japanese.png",
            linkUrl: "/pages/mapDetail/mapDetail"
        },{
            id: "sadfsadfasfasd fs sad sd",
            likes: 10,
            dislikes: 10,
            collections: 10,
            comments: 10,
            mapName: "日本料理",
            description: "日本料理，主要分为两大类『日本和食』和『日本洋食』。 [1]  当提到日本料理时，许多人会联想到寿司、生鱼片，这些日本人自己发明的食物就是『和食』",
            city: "武汉",
            locality: "江汉区",
            category: 1,
            txtStyle: "",
            imgUrl: "../../icons/category/Japanese.png",
            linkUrl: "/pages/mapDetail/mapDetail"
        }]

    },
    //主页面处理删除事件的数据同步
    deleteItem: function (eventDetail){
    
        let mapList=eventDetail.detail.mapList
        this.setData({
            mapList: mapList
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // wx.request({
        //     url: config.service.host + "/map/myMap/3",
        //     method: "GET",
        //     success: function (res) {
        //         console.log(res)
        //     }

        // })
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