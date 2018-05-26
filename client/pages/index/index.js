// pages/index/index.js

const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const util = require('../../utils/util')
const map = require('../../vendor/qqmap-wx-jssdk.min.js')
const app = getApp()

const mapkey = 'LREBZ-DKOKU-6GIVF-BOXUR-W6HWZ-LLBBI'
const mapsdk = new map({ key: mapkey })


Page({

    data: {
        //position
        city: "全国",

        //categories
        categories: [
            { name: "日韩料理", imageSrc: "../../icons/category/Japanese.png", url: "../categories/categories" },
            { name: "西式简餐", imageSrc: "../../icons/category/western.png", url: "../categories/categories" },
            { name: "川湘菜", imageSrc: "../../icons/category/ChuanXiang.png", url: "../categories/categories" },
            { name: "东南亚风情", imageSrc: "../../icons/category/Southeast_Asia.png", url: "../categories/categories" },
            { name: "更多", imageSrc: "../../icons/category/else.png", url: "../categories/categories" }
        ],

        //swiper
        imageUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        

        //navbar
        tabs: ["最多like", "最新", "最热"],
        activeIndex: 0,
        sliderOffset: 0,

        //mapList
        likeList: [],
        likeOffset:0,
        likeIsEnd:false,
        timeList:[],
        timeOffset:0,
        timeIsEnd: false,
        hotList:[],
        hotOffset:0,
        hotIsEnd: false,


    },

    onShow() {
        if (app.data.city) {
            this.setData({ city: app.data.city })
        }
    },

    onLoad() {
        var that = this

        //获得当前位置
        util.checkLocationAuth((success) => {
            if (success) { //已授权或允许授权
                that.confirmLocation()
            } else {
                util.showModel('提示', '您关闭了定位信息，部分功能将受到限制，若要重新授权请按如下步骤\n右上角"···"->"关于"->右上角"···"->设置')
            }
        })

        this._loadList('like')
        this._loadList('time')
        this._loadList('hot')
        
    },

    inputConfirm(e) {
        console.log(e);
    },

    tabClick(e) {
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.dataset.index
        });
    },

    confirmLocation() {
        var that = this
        mapsdk.reverseGeocoder({
            success: (res) => {
                var city = res.result.address_component.city
                city = city.replace(/市/, '')
                city = city.replace(/特别行政区/, '')
                that.setData({
                    city: city
                })
            }
        })
    },

    _loadList(order,limit = 5) {
        let that = this
        let offset = this.data[order+'Offset']
        wx.request({
            url: config.service.host + '/map/mapList',
            data: {
                offset,
                order,
                limit
            },
            success(res) {
                let maps  = {}
                maps[order + 'List'] = that.data[order + 'List'].concat(res.data.data.maps)
                maps[order + 'Offset'] = that.data[order + 'Offset']+limit
                if(res.data.data.maps.length < limit){
                    maps[order+'IsEnd'] = true
                }
                that.setData(maps)
            }
        })
    },

    onReachBottom() {
        let order = ['like','time','hot']
        order = order[this.data.activeIndex]
        if(!this.data[order+'IsEnd']){
            this._loadList(order)
        } 
    }
})
