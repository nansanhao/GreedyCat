// pages/homePage/homePage.js
const app = getApp()

Page({
    data: {
        avatarUrl: "../../icons/user-unlogin.png",
        nickName: "游客",
        icons: [
            { name: "likes", num: 0, imageUrl: "../../icons/icon.png" },
            { name: "dislikes", num: 0, imageUrl: "../../icons/icon.png" },
            { name: "collections", num: 0, imageUrl: "../../icons/icon.png" }],
        linksList: [
            { name: "我的地图", linkUrl: "/pages/myMaps/myMaps" },
            { name: "我的收藏", linkUrl: "#" },
            { name: "我的喜欢", linkUrl: "#" },
            { name: "帮助", linkUrl: "#" },
            { name: "反馈", linkUrl: "#" }
        ],
        modalHidden: true
    },


    onShow() { //每次显示刷新一下数据 防止头像加载失败
        if (app.data.logged && app.data.userAuthory) {
            this._refreshInfo()
        } else if (!app.data.userAuthory) { //未授权登录
            this.setData({ modalHidden: false })
        }

    },

    onClose() { this.setData({ modalHidden: true }) },

    _refreshInfo (){ //刷新数据
        let userInfo = app.data.userInfo
        let numbers = app.data.numbers
        let icons = this.data.icons
        icons.map((item, index) => { item.num = numbers[index] })
        this.setData({
            avatarUrl: userInfo.avatarUrl,
            nickName: userInfo.nickName,
            icons
        })
    },

    confirmAuthory(e) { //确认用户是否有授权
        this.setData({ modalHidden: true })
        var that = this
        if (e.detail.userInfo) { //授权成功登录并更新数据
            app.data.userAuthory =true
            app.login(that._refreshInfo)
        }
    },
    navigateTo (e) { //列表项跳转 需要判断是否登录
        if (app.data.logged && app.data.userAuthory) {
            console.log(e)
           wx.navigateTo({
               url:e.currentTarget.dataset.url
           })
        } else if (!app.data.userAuthory) { //未授权登录
            this.setData({ modalHidden: false })
        }
    }
})