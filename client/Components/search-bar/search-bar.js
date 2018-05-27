// Components/searchBar.js
Component({
    properties:{
        cancelColor:{
            type:String,
            value:"#fff"
        },
        inputShowed:{
            type:Boolean,
            value:false,
        },
        inputVal:{
            type:String,
            value:''
        }
    },


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



  

});
