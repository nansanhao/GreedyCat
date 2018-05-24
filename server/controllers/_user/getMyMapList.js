const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    const {
        openId: author_id
    } = ctx.request.query
    try {
        res = await mysql('map').select().where({author_id})
        res.map((value,index)=>{
            value.category = JSON.parse(value.category)
        })
        ctx.state.data = {
            maps: res
        }

    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}