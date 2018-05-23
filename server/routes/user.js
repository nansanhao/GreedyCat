
const router = require('koa-router')()
const controllers = require('../controllers')

//用户每次登陆记录其信息
router.post('/save',controllers._user.save)
//用户设定主地图
router.post('/setMainMap',controllers._user.setMainMap)
//获取用户地图列表
router.get('/mapList',controllers._user.getMyMapList)
module.exports = router