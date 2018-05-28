// Components/delete-list/delete-list.js
Component({
    properties: {
        configList: {
            type: Array,
        },
        bubbleTap: {
            type: Boolean,
            value: false
        }
    },
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },

    data: {
        startX: 0,//滑动开始的x坐标
        buttonWidth: 100,//删除按钮的宽
        activeIndex: NaN
    },

    methods: {
        ontouchStart(e) {
            if (e.touches.length == 1) {
                let currentIndex = e.currentTarget.dataset.index;
                let { configList, activeIndex } = this.data;
                if(activeIndex){
                    configList[activeIndex].leftDistance = 0;
                }
                this.setData({
                    startX: e.touches[0].clientX
                });
            }

        },


        ontouchEnd(e) {
            if (e.changedTouches.length == 1) {
                let moveX = e.changedTouches[0].clientX;
                let distance = this.data.startX - moveX;
                let index = e.currentTarget.dataset.index;
                let { buttonWidth, configList, activeIndex } = this.data
                if (distance > buttonWidth / 2) {
                    configList[index].leftDistance = -buttonWidth;
                    activeIndex = index;
                } else {
                    configList[index].leftDistance = 0
                    activeIndex = NaN;
                }
                this.setData({
                    configList,
                    activeIndex
                })
                console.log(e)
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
