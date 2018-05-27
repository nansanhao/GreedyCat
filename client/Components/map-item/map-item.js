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
                { name: "likes", num: this.data.itemDetail.likes, imgUrl:'../../icons/like.png' },
                { name: "dislikes", num: this.data.itemDetail.dislikes, imgUrl:'../../icons/dislike.png' },
                { name: "comments", num: this.data.itemDetail.comments, imgUrl:'../../icons/comment.png' },
                { name: "collections", num: this.data.itemDetail.collections, imgUrl:'../../icons/collect.png' },
            ]
        })
    }
})
