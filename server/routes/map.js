
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
router.post('/coordinate')
//查看坐标信息
router.get('/coordinate')
//删除坐标
router.delete('coordinate')
//修改坐标信息
router.put('/coordinate')

//新建评论
router.post('/coordinate')
//删除评论
router.delete('coordinate')



module.exports = router