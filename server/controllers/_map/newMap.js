const {
    mysql
} = require('../../qcloud')
const moment = require('moment')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    const {
        map: mapDetail,
        openId: open_id
    } = ctx.request.body.map;
    const {
        mapName: map_name,
        description,
        city,
        locality,
        category,
        ispublic: is_public
    } = mapDetail

    try {

    } catch (e) {
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}