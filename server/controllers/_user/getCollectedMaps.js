const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    let {
        openId: open_id,
    } = ctx.request.query

    try {
        res = await mysql('userAdmiredMap').select('mapid').where({
            open_id,
            collecteds: true
        })

        mapid = []

        for( item of res) {
            mapid.push(res.mapid)
        }

        maps = await mysql('map').whereIn('mapid',mapid)

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