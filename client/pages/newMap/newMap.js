// pages/newMap/newMap.js

const config = require('../../config')
Page({
    /**
     * 页面的初始数据
     */
    data: {
        mapid:null,
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
        let newMap = e.detail.value
        let openId=getApp().data.userInfo.openId
        if(newMap.mapName=='') {
            wx.showModal({
                title: '提示',
                content: '地图名不能为空',
                showCancel:false,
                confirmColor:'#EB6159'
            })
        } else {
            let data = {
                open_id: openId,
                map: {
                    map_name: newMap.mapName,
                    description: newMap.description,
                    province: this.data.location[0],
                    city: this.data.location[1],
                    locality: this.data.location[2],
                    is_public: newMap.isPublic
                }
            };
            console.log(data)
            //向后台发送数据
            wx.request({
                url: config.service.host + "/map/myMap",
                method: "POST",
                data,
                success: function (res) {
                    console.log(res)
                }

            })
        }
        
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

    onLoad() {
        if (this.options.mapid) { //更新坐标
            let mapid = this.options.mapid
            wx.setNavigationBarTitle({
                title: '管理地图信息',
            })
            this.setData({ mapid })
            this._setLoadDetail()
        } else { //新建坐标
            
        }
    },

    _setLoadDetail() {
        let that = this
        wx.request({
            url: config.service.host + '/map/mapDetail',
            data: {
                mapid: that.options.mapid
            },
            success(res) {
                let rawData = res.data.data.map
                let data = that._dataProcess(rawData)
                that.setData(data)
            }
        })
    },

    _dataProcess(rawData) {
        let categories = this.data.categories
        let categoryIndex = categories.indexOf(rawData.category)

        let data = {
            map_name: rawData.map_name,
            description: rawData.description,
            categoryIndex,
            textareaLen: rawData.description.length
        }

        return data
    }
})