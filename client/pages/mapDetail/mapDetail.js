// pages/mapDetail/mapDetail.js
Page({

  /**
   * 页面的初始数据nickname
  avaterUrl:(用户头像的url)
   */
  data: {
      icons:[
          { name: "likes", num: 5255, imageUrl:"../../icons/icon.png"},
          { name: "dislikes", num: 125, imageUrl: "../../icons/icon.png" },
          { name: "collection", num: 35, imageUrl: "../../icons/icon.png" }],
        description:"这是一段示例文字",
        userName:"小明",
        comments:[
            { userName: "小红", avaterUrl:"../../icons/icon.png",content:"这是一段评论。"},
            { userName: "小红", avaterUrl: "../../icons/icon.png", content: "这是一段评论。" },
            { userName: "小红", avaterUrl: "../../icons/icon.png", content: "这是一段评论。" },
            { userName: "小红", avaterUrl: "../../icons/icon.png", content: "这是一段评论。" },
            { userName: "小红", avaterUrl: "../../icons/icon.png", content: "这是一段评论。" }
        ],
      latitude: 23.099994,
      longitude: 113.324520,
      markers: [{
          latitude: 23.099994,
          longitude: 113.324520,
          name: 'T.I.T 创意园'
      }],
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