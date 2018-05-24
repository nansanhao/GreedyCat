const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    const {
        mapId: mapid
    } = ctx.request.query
    try {
        let res = await mysql('map').select().where({
            mapid
        })
        let map = res[0]
        res = await mysql('user').select('simple_user_info').where({
            open_id: res[0].author_id
        })

        Reflect.deleteProperty(map, 'author_id')
        map.category = JSON.parse(map.category)
        author = JSON.parse(res[0].simple_user_info)


        ctx.state.data = {
            map,
            author
        }

    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}