const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    const { mapid }= ctx.params
    try {
        res = await mysql('map').select().where({mapid})
        let map = res[0]
        Reflect.deleteProperty(map,'author_id')
        map.category = JSON.parse(map.category)
        ctx.state.data = {
            map
        }
    
    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}