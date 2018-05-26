// pages/categories/categories.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories: [
      { name: "日韩料理", imageSrc: "../../icons/category/Japanese.png" },
      { name: "西式简餐", imageSrc: "../../icons/category/western.png" },
      { name: "川湘菜", imageSrc: "../../icons/category/ChuanXiang.png" },
      { name: "东南亚风情", imageSrc: "../../icons/category/Southeast_Asia.png" },
      { name: "下午茶甜点", imageSrc: "../../icons/category/dessert.png" },
      { name: "特色私房", imageSrc: "../../icons/category/Cantonese.png" },
      { name: "养生早点", imageSrc: "../../icons/category/breakfast.png" },
      { name: "简约小食", imageSrc: "../../icons/category/bbq.png" },
      { name: "其他", imageSrc: "../../icons/category/else.png" },
    ],
  },

    onLoad() {
        this.setData({
            city:getApp().data.city
        })
    }
})