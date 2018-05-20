
const router = require('koa-router')()
const controllers = require('../controllers')

//用户每次登陆记录其信息
router.post('/save',controllers._user.save)

module.exports = router