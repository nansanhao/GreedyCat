// pages/homePage/homePage.js
const app = getApp()

Page({
    data: {
        avatarUrl: "../../icons/user-unlogin.png",
        nickName: "游客",
        icons: [
            { name: "喜欢", num: 5255, imageUrl: "../../icons/icon.png" },
            { name: "被踩", num: 125, imageUrl: "../../icons/icon.png" },
            { name: "被收藏", num: 35, imageUrl: "../../icons/icon.png" }],
        linksList: [
            { name: "我的地图", linkUrl: "#" },
            { name: "我的收藏", linkUrl: "#" },
            { name: "我的喜欢", linkUrl: "#" },
            { name: "帮助", linkUrl: "#" },
            { name: "反馈", linkUrl: "#" }
        ],
        modalHidden: true
    },


    onLoad() {
        if (app.data.logged && app.data.userAuthory) {
            let userInfo = app.data.userInfo
            this.setData({
                avatarUrl: userInfo.avatarUrl,
                nickName: userInfo.nickName
            })
        } else if (!app.data.userAuthory) { //未授权登录
            this.setData({ modalHidden: false })
        }

    },

    onShow() { //防止用户获取图片超时，每次都刷新
        var avartarUrl = this.data.avatarUrl
        this.setData({
            avatarUrl: avartarUrl
        })
    },

    confirmAuthory(e) {
        if (e.detail.userInfo) {
            app.login(() => {
                let userInfo = app.data.userInfo
                this.setData({
                    avatarUrl: userInfo.avatarUrl,
                    nickName: userInfo.nickName,
                    modalHidden: true
                })
            })
        }
    }
})