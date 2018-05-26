const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    let {
        limit,
        offset,
        keyword,
        category,
        locality
    } = dataProcess(ctx.request.query)

    try {
        res = await mysql('map').select('mapid')
            .where(function () {
                this.where('province', 'like', locality)
                    .orWhere('city', 'like', locality).orWhere('locality', 'like', locality)
            })


        let coordinates = []
        if (res[0]) {
            let mapids = []
            for (map of res) {
                mapids.push(map.mapid)
            }
            coordinates = await mysql('coordinate').whereIn('mapid', mapids)
                .andWhere('category', 'like', category)
                .andWhere(function () {
                    this.where('name', 'like', keyword).orWhere('description', 'like', keyword).orWhere('address', 'like', keyword)
                }).orderBy('create_time', 'desc').limit(limit).offset(offset)
        }

        ctx.state.data = {
            coordinates
        }


    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}

function dataProcess(data) {
    let {
        limit,
        offset,
        keyword,
        category,
        locality
    } = data

    limit = parseInt(limit) || 5
    offset = parseInt(offset) || 0

    category = category || ''
    category = "%" + category + "%"
    keyword = keyword || ''
    keyword = "%" + keyword + "%"
    locality = locality || ''
    locality = "%" + locality + "%"

    return {
        limit,
        offset,
        keyword,
        category,
        locality
    }
}