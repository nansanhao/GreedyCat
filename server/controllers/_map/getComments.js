const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    let {
        mapid
    } = ctx.request.query

    try {

        let comments = await mysql('comment')
            .select('comment.id', 'comment.create_time', 'comment.content', 'user.simple_user_info')
            .where({
                mapid
            }).innerJoin('user', 'user.open_id', 'comment.open_id').orderBy('comment.create_time','desc')
        if (comments[0]) {
            comments.map((value, index) => {
                value.simple_user_info = JSON.parse(value.simple_user_info)
                return value
            })
        }
        ctx.state.data = {
            comments
        }

    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}