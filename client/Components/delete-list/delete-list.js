// Components/delete-list/delete-list.js
Component({
    properties: {
        configList: {
            type: Array,
        },
        bubbleTap:{
            type: Boolean,
            value:false
        }
    },
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },

    data: {
        startX: 0,//滑动开始的x坐标
        buttonWidth: 100,//删除按钮的宽
    },

    methods: {
        ontouchStart(e) {
            let currentIndex = e.currentTarget.dataset.index;
            if (e.touches.length == 1) {
                let configList = this.data.configList;
                configList.map((value, index) => {
                    if (index != currentIndex) {
                        value.leftDistance = 0;
                    } return value;
                });
                this.setData({
                    startX: e.touches[0].clientX
                });
            }

        },

        ontouchMove(e) {
            let that = this;
            if (e.touches.length == 1) {
                let leftDistance= 0
                let moveX = e.touches[0].clientX;
                let distance = this.data.startX - moveX;
                let index = e.currentTarget.dataset.index;  //获取手指触摸的是哪一项
                let { configList, buttonWidth } = this.data
                if (distance <= 0) {                    //如果移动距离小于等于0，文本层位置不变
                    leftDistance = 0
                } else {                        //移动距离大于0，文本层left值等于手指移动距离
                    leftDistance = (distance < buttonWidth ? -distance : -buttonWidth)
                    //控制手指移动距离最大值为删除按钮的宽度
                }
                configList[index].leftDistance = leftDistance;
                this.setData({
                    configList
                });
            }
        },

        ontouchEnd(e) {
            if (e.changedTouches.length == 1) {
                let moveX = e.changedTouches[0].clientX;
                let distance = this.data.startX - moveX;
                let index = e.currentTarget.dataset.index;
                let { buttonWidth, configList } = this.data
                configList[index].leftDistance = (distance > buttonWidth / 2 ? -buttonWidth : 0)
                this.setData({
                    configList
                })
            }
        },

        onDelete(e) {
            let configList = this.data.configList;
            let index = e.currentTarget.dataset.index;
            let { itemId } = configList[index]
            configList.splice(index, 1);

            this.setData({
                configList
            });
            let eventOption = {
                composed: true,
                bubbles: true
            }
            this.triggerEvent('deleteItem', { itemId }, eventOption)
        },
        onTap(e) {
            let configList = this.data.configList;
            let index = e.currentTarget.dataset.index;
            if (configList[index].leftDistance == 0) {
                let eventOption = {
                    composed: true,
                    bubbles: true
                }
                let { itemId } = configList[index]
                this.triggerEvent('tapItem', { itemId }, eventOption)
            }
        }
    },


})
