// Components/map-item/map-item.js
Component({
  properties: {
    itemDetail: {
      type: Object
    }
  },

  attached() {
    this.setData({
      counters: [
        { name: "likes", num: this.data.itemDetail.likes },
        { name: "dislikes", num: this.data.itemDetail.dislikes },
        { name: "comments", num: this.data.itemDetail.comments },
        { name: "collections", num: this.data.itemDetail.collections },
      ]
    })
  }
})
