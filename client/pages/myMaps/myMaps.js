// pages/myMaps/myMaps.js
const config = require('../../config')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        startX: 0,//滑动开始的x坐标
        delBtnWidth:50,//删除按钮的宽
        mapList: [{
            id: "sadfsadfasfasd fsad sad sd",
            likes: 10,
            dislikes: 10,
            collections: 10,
            comments: 10,
            mapName: "日料万岁",
            description: "测试测试测试测试测试测试测试测asdfaaaaaaaaaaaaaaaaaaaaaaaaaaa都是感受到分公司电饭锅aaaasdfasdf",
            city: "武汉",
            locality: "江汉区",
            category: 1,
            txtStyle:""//用来滑动删除使用的字段
        },
        {
            id: "sadfsadfasfasd fs sad sd",
            likes: 10,
            dislikes: 10,
            collections: 10,
            comments: 10,
            mapName: "日料万岁",
            description: "测试测试测试测试测试测试测试测asdfaaaaaaaaaaaaaaaaaaaaaaaaaaa都是感受到分公司电饭锅aaaasdfasdf",
            city: "武汉",
            locality: "江汉区",
            category: 1,
            txtStyle: ""
        }]

    },
    //触摸开始
    bindtouchstart: function (e) {
        if (e.touches.length == 1) {
            this.setData({
                //设置触摸起始点水平方向位置
                startX: e.touches[0].clientX
            });

        }
    },
    //触摸时移动
    bindtouchmove: function (e) {
        let that = this;
        if (e.touches.length == 1) {
            let moveX = e.touches[0].clientX;
            let distant = this.data.startX - moveX;
            let txtStyle = "";
            let delBtnWidth = this.data.delBtnWidth;

            if (distant == 0 || distant < 0) {//如果移动距离小于等于0，文本层位置不变
                txtStyle = "left:0px";
            }
            else if(distant > 0){
                //移动距离大于0，文本层left值等于手指移动距离
                txtStyle = "left:-" + distant + "px";
                if (distant >= delBtnWidth) {
                    //控制手指移动距离最大值为删除按钮的宽度
                    txtStyle = "left:-" + delBtnWidth + "px";
                }
            }
            //获取手指触摸的是哪一项
            let index = e.currentTarget.dataset.index;
            let mapList = this.data.mapList;
            console.log(e)
            console.log(mapList)
            mapList[index].txtStyle = txtStyle;
            //更新列表的状态
            this.setData({
                mapList: mapList
            });
        }
    },
    bindtouchend: function (e) {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.request({
            url: config.service.host + "/map/myMap/3",
            method: "GET",
            success: function (res) {
                console.log(res)
            }

        })
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