const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    const {
        openId: author_id
    } = ctx.request.query
    try {
        let maps = await mysql('map').select().where({author_id})
        if(maps[0]) {
            maps.map((value,index)=>{
                value.category = JSON.parse(value.category)
                Reflect.deleteProperty(value,'is_public')
                Reflect.deleteProperty(value,'author_id')
                Reflect.deleteProperty(value,'create_time')
                return value
            })
        }

        ctx.state.data = {
            maps
        }

    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}