// pages/chooseCity/chooseCity.js

const city = require ('../../utils/city')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cityList:city,
    hotCity:["北京","上海","广州","深圳","成都","杭州"]
  },

  /**
   * 生命周期函数--监听页面加载
   */
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
  
  _cityProcess(){
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

  scrollTo(e){
    this.setData({
      viewID:"C"
    })
  }
})