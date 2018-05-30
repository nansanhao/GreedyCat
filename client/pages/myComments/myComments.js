// pages/myComments/myComments.js

const config = require('../../config')
const app = getApp()
Page({

    data: {
        commentList: [],
        list: []
    },

    onLoad: function (options) {
        let that = this
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        wx.request({
            url: config.service.host + "/user/comment",
            data: {
                openId: app.data.userInfo.openId
            },
            success(res) {
                let length = res.data.data.comments.length
                let commentList = res.data.data.comments
                that._setConfigList(length, commentList)
                that.setData({
                    commentList
                })
                wx.hideLoading()
            }

        })
    },

    onDeleteItem(e) {
        wx.showModal({
            title: '提示',
            content: '确定删除吗？',
            confirmColor: '#EB6159',
            success() {
                wx.request({
                    url: config.service.host + "/user/comment",
                    method: 'DELETE',
                    data: {
                        comment_id: e.detail.itemId
                    }
                })
            }
        })
    },

    _setConfigList(length, list) {
        let configList = Array.from({ length }, (v, i) => ({ leftDistance: 0, itemId: list[i].id }))
        this.setData({
            list: configList
        })
    }
})