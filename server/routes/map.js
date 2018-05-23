
const router = require('koa-router')()
const controllers = require('../controllers')

//用户新建地图
router.post('/myMap',controllers._map.newMap)
//获取地图信息
router.get('/myMap/:mapid',controllers._map.getMapDetail)
//更新用户信息
router.put('/myMap',controllers._map.updateMapDetail)
module.exports = router