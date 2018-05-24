
const router = require('koa-router')()
const controllers = require('../controllers')

//用户每次登陆记录其信息
router.post('/save',controllers._user.save)
//用户设定主地图
router.post('/setMainMap',controllers._user.setMainMap)
//获取用户地图列表
router.get('/mapList',controllers._user.getMyMapList)
//获取用户收藏地图列表
router.get('/collectedMapList',controllers._user.getCollectedMaps)
//删除收藏的地图
router.delete('/collectedMap',controllers._user.deleteCollectedMap)

//点赞、踩、收藏
router.post('/admiration',controllers._user.admiration)


//新建评论
router.post('/comment',controllers._user.newComment)
//获得评论列表
router.get('/comment',controllers._user.getComments)
//删除评论
router.delete('/comment',controllers._user.deleteComment)

module.exports = router