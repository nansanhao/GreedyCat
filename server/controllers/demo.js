const qcloud = require('../qcloud')
const { mysql } = qcloud

module.exports = async function (ctx, next) {
    console.log(ctx.request)
    ctx.response.type = 'json'
    ctx.response.body = {
        data: 'Hello World'
    }
    var res = await mysql('COMMENT').returning('id').insert({ userId: '123',createTime:mysql.fn.now(),content:'123' })
    console.log(res);
}
