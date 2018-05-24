const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    let {
        mapid,
        open_id
    } = ctx.request.body
    try {
        await mysql('map').where({
            mapid
        }).del()

        res = await mysql('user').select('main_mapid').where({
            open_id
        })
        let main_mapid = res[0].main_mapid
        if (main_mapid && main_mapid == mapid) {
            await mysql('user').where({
                open_id
            }).update({
                main_mapid: null
            })
        }
    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}