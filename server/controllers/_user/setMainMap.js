const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    const {
        open_id,
        main_mapid
    } = ctx.request.body;
    try {
        let res = await mysql('user').count('open_id as hasUser').where({
            open_id
        })
        if (res[0].hasUser) {
            await mysql('user').update({
                main_mapid
            }).where({
                open_id
            })
        }
    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}