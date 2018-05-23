const {
    mysql
} = require('../../qcloud')
const moment = require('moment')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    const {
        map: mapDetail,
        openId: author_id
    } = ctx.request.body;
    const {
        mapName: map_name,
        description,
        province,
        city,
        locality,
        isPublic: is_public
    } = mapDetail

    try {
        res = await mysql('map').insert({
            map_name,
            description,
            province,
            city,
            locality,
            is_public,
            author_id
        }).returning('mapid')
        ctx.state.data = {
            mapId: res[0]
        }
    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}