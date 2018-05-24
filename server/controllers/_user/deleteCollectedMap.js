const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    let {
        openId: open_id,
        mapid
    } = ctx.request.body

    try {
        res = await mysql('userAdmiredMap').update('collecteds', false).where({
            open_id,
            mapid
        }).returning('likes', 'dislikes')
        res = await mysql('map').where({
            mapid
        }).select('author_id')
        await mysql('user').where({
            open_id: res[0].author_id
        }).decrement('num_collecteds', 1)


        if (!res[0].likes && !res[0].dislikes) {
            mysql('userAdmiredMap').where({
                open_id,
                mapid
            }).del()
        }


    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}