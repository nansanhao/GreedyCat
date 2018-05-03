// Components/searchBar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function () {
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
    },
    inputTyping: function (e) {
      this.setData({
        inputVal: e.detail.value
      });
    },
    inputConfirm:function(e){
      this.triggerEvent("confirm",e.detail,{bubbles:true,capturePhase:true})
    }
  },


  data: {
    inputShowed: false,
    inputVal: ""
  },
  

});
