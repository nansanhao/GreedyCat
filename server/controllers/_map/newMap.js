const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    const {
        map: mapDetail,
        openId: author_id
    } = ctx.request.body;
    const {
        mapName: map_name,
        description,
        province,
        city,
        locality,
        isPublic: is_public
    } = mapDetail

    let informaiton = {
        map_name,
        description,
        province,
        city,
        locality,
        is_public,
        author_id,
    }
    if(mapDetail.category){
        informaiton.category=JSON.stringify(mapDetail.category)
    }

    try {
        let res = await mysql('map').insert(informaiton).returning('mapid')
        ctx.state.data = {
            mapId: res[0]
        }
    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}