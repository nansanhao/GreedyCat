/**
 * ajax 服务路由集合
 */
const router = require('koa-router')()
const controllers = require('../controllers')
const sdkRouter = require('./sdk')
const userRouter = require('./user')

router.use('/weapp',sdkRouter.routes())
router.use('/user',userRouter.routes())


module.exports = router
