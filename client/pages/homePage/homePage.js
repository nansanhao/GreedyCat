// pages/homePage/homePage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      avatarUrl:"../../icons/icon.png",
      nickname:"用户ID",
      icons: [
          { name: "喜欢", num: 5255, imageUrl: "../../icons/icon.png" },
          { name: "被踩", num: 125, imageUrl: "../../icons/icon.png" },
          { name: "被收藏", num: 35, imageUrl: "../../icons/icon.png" }],
      linksList: [
          { name: "我的地图", linkUrl: "#" },
          { name: "我的收藏", linkUrl: "#" },
          { name: "我的地图", linkUrl: "#" },
          { name: "我的地图", linkUrl: "#" },
          { name: "帮助", linkUrl: "#" },
          { name: "反馈", linkUrl: "#" }
      ],
      },
      

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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