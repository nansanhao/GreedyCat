const {
    mysql
} = require('../../qcloud')
const moment = require('moment')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    let comment = ctx.request.body
    comment.create_time = moment().format('YYYY-MM-DD HH:mm:ss')

    try {
        await mysql('map').where({
            mapid: comment.mapid
        }).increment('num_comment', 1)
        let res = await mysql('comment').insert(comment).returning('id')
        ctx.state.data = {
            comment_id: res[0]
        }
    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}