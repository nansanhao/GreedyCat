const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    const {
        mapid,
        openId: open_id
    } = ctx.request.query
    try {
        let res = await mysql('map').select().where({
            mapid
        })
        let map = res[0]
        if (map) {
            map.category = JSON.parse(map.category)

            //先处理作者
            res = await mysql('user').select('simple_user_info').where({
                open_id: map.author_id
            })
            let author = JSON.parse(res[0].simple_user_info)
            map.author = author

            //处理坐标数组
            let coordinates = await mysql('coordinate').select().where({
                mapid
            })
            map.coordinates = coordinates

            //处理评论数组
            let comments = await mysql('comment')
                .select('comment.id', 'comment.create_time', 'comment.content', 'user.simple_user_info')
                .where({
                    mapid
                }).innerJoin('user', 'user.open_id', 'comment.open_id')
            if (comments[0]) {
                comments.map((value, index) => {
                    value.simple_user_info = JSON.parse(value.simple_user_info)
                    return value
                })
            }
            map.comments = comments

            if (open_id) { //设置点赞
                let admiration = await mysql('userAdmiredMap').select('liked', 'disliked', 'collected').where({
                    mapid,
                    open_id
                })
                map.admiration = admiration
            }
        }

        ctx.state.data = {
            map
        }




    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}