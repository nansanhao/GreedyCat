// pages/chooseCity/chooseCity.js

const city = require('../../utils/city')


Page({

    data: {
        hotCity: ["北京", "上海", "广州", "深圳", "成都", "杭州"],
        toID: "hot"
    },

    onLoad: function (options) {
        this._cityProcess();
        var that = this;
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    systemInfo: res
                })
            }
        })
    },

    onShow(){
    },

    _cityProcess() {
        let cityList = [], item;
        for (let c of city) {
            item = cityList.find((value) => value.name == c.pinyin.toUpperCase());
            if (!item) {
                var arr = [];
                arr.push(c.name);
                var obj = {};
                obj.name = c.pinyin.toUpperCase();
                obj.list = arr;
                cityList.push(obj);
            } else {
                item.list.push(c.name);
            }
        };
        this.setData({
            cityList: cityList
        })
    },

    scrollTo(e) {
        wx.showToast({
            title: e.target.dataset.choice == "hot" ? "热门城市" : e.target.dataset.choice,
            icon: "none"
        })
        this.setData({
            toID: e.target.dataset.choice
        })
    },


})