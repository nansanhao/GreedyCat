const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    let {
        comment_id: id
    } = ctx.request.body


    try {
        res = await mysql('comment').select('mapid').where({id})
        await mysql('map').where({
            mapid: res[0].mapid
        }).decrement('num_comment', 1)
        await mysql('comment').where({
            id
        }).del()
    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}