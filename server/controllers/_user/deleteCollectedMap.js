const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    let {
        open_id,
        mapid
    } = ctx.request.body

    try {
        let res = await mysql('userAdmiredMap').select('liked','disliked').where({
            open_id,
            mapid
        })
        if (!res[0].liked && !res[0].disliked) {
            await mysql('userAdmiredMap').where({
                open_id,
                mapid
            }).del()
        } else {
            await mysql('userAdmiredMap').update('collected',false).where({
                open_id,
                mapid
            })
        }

        res = await mysql('map').where({
            mapid
        }).select('author_id')
        await mysql('user').where({
            open_id: res[0].author_id
        }).decrement('num_collected', 1)
        await mysql('map').where({
            mapid
        }).decrement('num_collected', 1)

    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}