// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: "武汉",
    categories: [
      { name: "日料", imageSrc: "../../icons/icon.png", url:"../categories/categories" },
      { name: "西式简餐", imageSrc: "../../icons/icon.png", url:"../categories/categories" },
      { name: "川湘菜", imageSrc: "../../icons/icon.png", url:"../categories/categories" },
      { name: "东南亚风情", imageSrc: "../../icons/icon.png", url:"../categories/categories" },
      { name: "更多", imageSrc: "../../icons/icon.png", url:"../categories/categories" }
    ],
    imageUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    mostLikesList:[{
      id:"sadfsadfasfasd fsad sad sd",
      likes:10,
      dislikes:10,
      collections:10,
      comments:10,
      mapName:"日料万岁",
      description:"测试测试测试测试测试测试测试测asdfaaaaaaaaaaaaaaaaaaaaaaaaaaa都是感受到分公司电饭锅aaaasdfasdf",
      city: "武汉",
      locality: "江汉区",
      category: 1
    }],
    tabs: ["最多like", "最新", "最热"],
    activeIndex: 0,
    sliderOffset: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  inputConfirm: function (e) {
    console.log(e);
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.dataset.index
    });
  },
})
