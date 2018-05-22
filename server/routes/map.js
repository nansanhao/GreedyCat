
const router = require('koa-router')()
const controllers = require('../controllers')

//用户新建地图
router.post('/newMap',controllers._map.newMap)

module.exports = router