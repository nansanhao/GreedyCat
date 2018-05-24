const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    let {
        map: mapDetail,
        open_id: author_id
    } = ctx.request.body;
    
    if(mapDetail.category){
        mapDetail.category=JSON.stringify(mapDetail.category)
    }

    mapDetail.author_id=author_id

    try {
        let res = await mysql('map').insert(mapDetail).returning('mapid')
        ctx.state.data = {
            mapid: res[0]
        }
    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}