const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    let {
        map: mapDetail,
        mapid
    } = ctx.request.body

    if (mapDetail.category) {
        mapDetail.category = JSON.stringify(mapDetail.category)
    }


    try {
        let res = await mysql('map').update(mapDetail).where({
            mapid
        })
    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}