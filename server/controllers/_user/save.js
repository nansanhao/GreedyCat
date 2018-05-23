const {
    mysql
} = require('../../qcloud')
const moment = require('moment')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    const userInfo = ctx.request.body;
    const open_id = userInfo.openId;
    const simple_user_info = JSON.stringify({
        nickName: userInfo.nickName,
        avatarUrl: userInfo.avatarUrl
    })
    try {
        var res = await mysql('user').count('open_id as hasUser').where({
            open_id
        })
        if (res[0].hasUser) {
            await mysql('user').update({
                    last_visit_time: moment().format('YYYY-MM-DD HH:mm:ss'),
                    simple_user_info
                }).where({
                    open_id
                }),
                res = await mysql('user').select('num_likes', 'num_dislikes', 'num_collecteds','main_mapid').where({
                    open_id
                });
                ctx.state.data = {
                    numbers: [res[0].num_likes, res[0].num_dislikes, res[0].num_collecteds],
                    mainMapId:res[0].main_mapid
                }
        } else {
            await mysql('user').insert({
                open_id,
                simple_user_info,
            })
            ctx.state.data = {
                numbers: [0, 0, 0],
                mainMapId:null,
            }
        }
    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}