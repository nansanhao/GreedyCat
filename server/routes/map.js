
const router = require('koa-router')()
const controllers = require('../controllers')

//用户新建地图
router.post('/myMap',controllers._map.newMap)
//获取地图信息
router.get('/myMap',controllers._map.getMapDetail)
//删除对应用户地图
router.delete('/myMap',controllers._map.deleteMap)
//更新地图信息
router.put('/myMap',controllers._map.updateMapDetail)


//新建坐标
router.post('/coordinate',controllers._map.newCoordinate)
//查看坐标信息
router.get('/coordinate',controllers._map.getCoordinate)
//删除坐标
router.delete('/coordinate',controllers._map.deleteCoordinate)
//修改坐标信息
router.put('/coordinate',controllers._map.updateCoordinate)

//搜索关键字
router.get('/search')
//获取列表
router.get('/mapList')



module.exports = router