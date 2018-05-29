const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    let {
        openId: open_id
    } = ctx.request.query

    try {
        let res = await mysql('comment').where({
            open_id
        }).select('comment.id','comment.content','comment.is_public','map.map_name','map.main_image_url','map.city','map.locality').innerJoin('map', 'map.mapid', 'comment.mapid')

        ctx.state.data = {
            comments: res
        }

    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}