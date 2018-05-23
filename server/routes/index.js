/**
 * ajax 服务路由集合
 */
const router = require('koa-router')()
const sdkRouter = require('./sdk')
const userRouter = require('./user')
const mapRouter = require('./map')


router.use('/weapp', sdkRouter.routes())
router.use('/user', userRouter.routes())
router.use('/map', mapRouter.routes())


module.exports = router