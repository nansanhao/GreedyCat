//app.js

const qcloud = require('./vendor/wafer2-client-sdk/index')
const config = require('./config')
const util = require('./utils/util')

App({
    data: {
        userInfo: {},
        logged: false,
        userAuthory: false
    },
    onLaunch: function () {
        qcloud.setLoginUrl(config.service.loginUrl)
        var that = this
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                    that.login()
                    that.data.userAuthory = true
                } else {
                    that.data.userAuthory = false
                }
            }
        })
    },
    login(callback = () => { }) {
        if (this.data.logged) return

        util.showBusy('正在登录')
        var that = this

        // 调用登录接口
        qcloud.login({
            success(result) {
                if (result) {
                    util.showSuccess('登录成功')
                    that.data.userInfo = result
                    that.data.logged = true
                    callback()
                } else {
                    // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                    qcloud.request({
                        url: config.service.requestUrl,
                        login: true,
                        success(result) {
                            util.showSuccess('登录成功')
                            that.data.userInfo = result.data.data
                            that.data.logged = true
                            callback()
                        },

                        fail(error) {
                            util.showModel('请求失败', error.message)
                        }
                    })
                }
            },
            fail(error) {
                util.showModel('登录失败', error.message)
                console.log(error)
            }
        })
    },

})