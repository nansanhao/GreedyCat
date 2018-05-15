const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: content,
        showCancel: false,
        confirmColor:"#EB6159"
    })
}

function checkLocationAuth(callback) {
    wx.getSetting({
        success(res) {
            if (!res.authSetting['scope.userLocation']) {
                wx.authorize({
                    scope: 'scope.userLocation',
                    success() {
                        callback()
                    },
                    fail() {
                        showModel("获取用户位置失败，请用户重新授权", "右上角 - 关于 - 右上角 - 设置")                     
                    }
                })
            } else {
                callback()
            }
        }
    })
}

module.exports = { formatTime, showBusy, showSuccess, showModel, checkLocationAuth}

