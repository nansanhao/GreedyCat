const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    const {
        mapId:mapid,
        mapName: map_name,
        description,
        province,
        city,
        locality,
        isPublic: is_public
    } = ctx.request.body.map
    

    let information = {
        map_name,
        description,
        province,
        city,
        locality,
        is_public,
    }

    const category = ctx.request.body.map.category
    if(category){
        information.category=JSON.stringify(category)
    }

    try {
        res = await mysql('map').update(information).where({ mapid })
    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}