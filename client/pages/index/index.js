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
        city: "全国",
        categories: [
            { name: "日料", imageSrc: "../../icons/icon.png", url: "../categories/categories" },
            { name: "西式简餐", imageSrc: "../../icons/icon.png", url: "../categories/categories" },
            { name: "川湘菜", imageSrc: "../../icons/icon.png", url: "../categories/categories" },
            { name: "东南亚风情", imageSrc: "../../icons/icon.png", url: "../categories/categories" },
            { name: "更多", imageSrc: "../../icons/icon.png", url: "../categories/categories" }
        ],
        imageUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        mostLikesList: [{
            id: "sadfsadfasfasd fsad sad sd",
            likes: 10,
            dislikes: 10,
            collections: 10,
            comments: 10,
            mapName: "日料万岁",
            description: "测试测试测试测试测试测试测试测asdfaaaaaaaaaaaaaaaaaaaaaaaaaaa都是感受到分公司电饭锅aaaasdfasdf",
            city: "武汉",
            locality: "江汉区",
            category: 1
        }],
        tabs: ["最多like", "最新", "最热"],
        activeIndex: 0,
        sliderOffset: 0,
    },

    onShow() {
        if (app.data.city) {
            this.setData({ city: app.data.city })
        }
    },

    onLoad() {
        var that = this
        util.checkLocationAuth((success) => {
            if (success) { //已授权或允许授权
                that.confirmLocation()
            } else {
                util.showModel('提示', '您关闭了定位信息，部分功能将受到限制，若要重新授权请按如下步骤\n右上角"···"->"关于"->右上角"···"->设置')
            }

        })
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
})
