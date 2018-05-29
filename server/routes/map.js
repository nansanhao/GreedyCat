
const router = require('koa-router')()
const controllers = require('../controllers')

//用户新建地图
router.post('/myMap',controllers._map.newMap)
//删除对应用户地图
router.delete('/myMap',controllers._map.deleteMap)
//更新地图信息
router.put('/myMap',controllers._map.updateMapDetail)

//获取地图信息
router.get('/mapDetail',controllers._map.getMapDetail)


router.get('/comments',controllers._map.getComments)

//新建坐标
router.post('/coordinate',controllers._map.newCoordinate)
//查看坐标信息
router.get('/coordinate',controllers._map.getCoordinate)
//删除坐标
router.delete('/coordinate',controllers._map.deleteCoordinate)
//修改坐标信息
router.put('/coordinate',controllers._map.updateCoordinate)


//获取地图列表
router.get('/mapList',controllers._map.getMapList)
//获取坐标列表
router.get('/coordinateList',controllers._map.getCoordinateList)




module.exports = router