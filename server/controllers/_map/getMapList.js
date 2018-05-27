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
        order,
        locality
    } = dataProcess(ctx.request.query)

    try {


        let otherCategory = (category == "%其他%" ? '%[]%' : category)
        maps = await mysql('map').select()
            .where('is_public', true)
            .andWhere(function () {
                this.where('category', 'like', category).orWhere('category', 'like', otherCategory)
            })
            .andWhere(function () {
                this.where('map_name', 'like', keyword).orWhere('description', 'like', keyword)
            })
            .andWhere(function () {
                this.where('province', 'like', locality)
                    .orWhere('city', 'like', locality).orWhere('locality', 'like', locality)
            })
            .orderBy(order, order == 'create_time' ? 'asc' : 'desc').limit(limit).offset(offset)



        if (maps[0]) {
            maps.map((value, index) => {
                value.category = JSON.parse(value.category)
                Reflect.deleteProperty(value, 'is_public')
                Reflect.deleteProperty(value, 'author_id')
                Reflect.deleteProperty(value, 'create_time')
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

function dataProcess(data) {
    let {
        limit,
        offset,
        keyword,
        category,
        order,
        locality
    } = data

    limit = parseInt(limit) || 5
    offset = parseInt(offset) || 0
    switch (order) {
        case "like":
            order = "num_liked";
            break;
        case "time":
            order = "create_time";
            break;
        case "hot":
            order = "num_comment";
            break;
        default:
            order = "mapid"
    }
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
        order,
        locality
    }
}