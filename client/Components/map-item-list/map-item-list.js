// Components/map-item-list/map-item-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      mapList: {
          type: Object
      }
  },

  /**
   * 组件的初始数据
   */
  data: {
      startX: 0,//滑动开始的x坐标
      delBtnWidth: 100,//删除按钮的宽
  },

  /**
   * 组件的方法列表
   */
  methods: {
      //触摸开始
      bindtouchstart: function (e) {
          let index = e.currentTarget.dataset.index;
          if (e.touches.length == 1) {
              let mapList = this.data.mapList;
              mapList = mapList.map(function (map, mapIndex) {
                  if (mapIndex != index) {
                      map.txtStyle = "left:0rpx";
                  }
              });
              this.setData({
                  //设置触摸起始点水平方向位置
                  startX: e.touches[0].clientX
              });

          }

      },
      //触摸时移动
      bindtouchmove: function (e) {
          let that = this;
          if (e.touches.length == 1) {
              let moveX = e.touches[0].clientX;
              let distant = this.data.startX - moveX;
              //获取手指触摸的是哪一项
              let index = e.currentTarget.dataset.index;
              let mapList = this.data.mapList;
              let txtStyle = "";
              let delBtnWidth = this.data.delBtnWidth;

              if (distant == 0 || distant < 0) {//如果移动距离小于等于0，文本层位置不变
                  txtStyle = "left:0rpx";
              }
              else if (distant > 0) {
                  //移动距离大于0，文本层left值等于手指移动距离
                  txtStyle = "left:-" + distant*2 + "rpx";
                  if (distant >= delBtnWidth) {
                      //控制手指移动距离最大值为删除按钮的宽度
                      txtStyle = "left:-" + delBtnWidth*2 + "rpx";
                  }
              }

              mapList[index].txtStyle = txtStyle;
              //更新列表的状态
              this.setData({
                  mapList: mapList
              });
          }
      },
      //触摸结束
      bindtouchend: function (e) {
          if (e.changedTouches.length == 1) {
              let moveX = e.changedTouches[0].clientX;
              let distant = this.data.startX - moveX;
              if (distant <= this.data.delBtnWidth / 2) {
                  let index = e.currentTarget.dataset.index;
                  let mapList = this.data.mapList;
                  mapList[index].txtStyle = "";

                  this.setData({
                      mapList: mapList
                  })

              } else {
                  let index = e.currentTarget.dataset.index;
                  let mapList = this.data.mapList;
                  mapList[index].txtStyle = "left:-200rpx";

                  this.setData({
                      mapList: mapList
                  })
              }
          }
      },
      //点击事件
      bindtap:function(e){
          let url = e.currentTarget.dataset.url;
        //   wx.navigateTo({
        //       url: url
        //   })
      },
      btnDelete: function (e) {
          let mapList = this.data.mapList;
          let id = e.currentTarget.dataset.id;

          let mapIndex = mapList.findIndex(function (map) {
              return map.id == id;
          })
          mapList.splice(mapIndex, 1);
          this.setData({
              mapList: mapList
          });
          // 所有要带到主页面的数据，都装在eventDetail里面
          let eventDetail = {
              name: 'delete item of super',
              mapList: this.data.mapList
          }
          // 触发事件的选项 bubbles是否冒泡，composed是否可穿越组件边界，capturePhase 是否有捕获阶段
          let eventOption = {
              composed: true
          }
          this.triggerEvent('deleteItem', eventDetail, eventOption)
      }
  }
})
