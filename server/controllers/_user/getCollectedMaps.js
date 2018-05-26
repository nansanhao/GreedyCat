const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    let {
        openId: open_id,
    } = ctx.request.query

    try {
        res = await mysql('userAdmiredMap').select('mapid').where({
            open_id,
            collected: true
        })

        mapid = []

        for( item of res) {
            mapid.push(item.mapid)
        }

        maps = await mysql('map').whereIn('mapid',mapid).andWhere('is_public',true)
        if(maps[0]) {
            maps.map((value,index)=>{
                value.category = JSON.parse(value.category)
                Reflect.deleteProperty(value,'is_public')
                Reflect.deleteProperty(value,'author_id')
                Reflect.deleteProperty(value,'create_time')
                return value
            })
        }

        ctx.state.data = {
            maps 
        }
    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}