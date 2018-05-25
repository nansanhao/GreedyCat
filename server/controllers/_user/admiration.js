const {
    mysql
} = require('../../qcloud')
const debug = require('debug')('qcloud-sdk[AuthDbService]')

module.exports = async (ctx, next) => {
    let admiration = ctx.request.body
    let {
        open_id,
        mapid
    } = admiration

    try {
        res = await mysql('userAdmiredMap').where({
            open_id,
            mapid
        }).select('liked', 'disliked', 'collected')
        await processAdmiration(res[0], admiration)

    } catch (e) {
        console.log(e)
        debug('%s: %O', ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB, e)
        throw new Error(`${ERRORS.DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

    next()
}

async function processAdmiration(oldAdmiration, newAdmiration) {
    let {
        liked,
        disliked,
        collected,
        open_id,
        mapid
    } = newAdmiration

    if (!oldAdmiration) { //判断原本有没有该条记录
        await mysql('userAdmiredMap').insert(newAdmiration)
        await checkAdmiration(newAdmiration)
    } else {
        if (!liked && !disliked && !collected) {
            await mysql('userAdmiredMap').where({
                open_id,
                mapid
            }).del()
        } else {
            await mysql('userAdmiredMap').update({
                liked,
                disliked,
                collected
            }).where({
                open_id,
                mapid
            })
        }
        await compareAdmiration(oldAdmiration, newAdmiration)
    }
}

async function checkAdmiration(newAdmiration) {
    let {
        mapid
    } = newAdmiration
    Reflect.deleteProperty(newAdmiration, 'mapid')
    Reflect.deleteProperty(newAdmiration, 'open_id')
    let properties = Object.getOwnPropertyNames(newAdmiration)
    for (property of properties) {
        if (newAdmiration[property]) {
            await updateNumOfAdmiration(property, mapid, true)
        }
    }
}

async function compareAdmiration(oldAdmiration, newAdmiration) {
    let {
        mapid
    } = newAdmiration
    Reflect.deleteProperty(newAdmiration, 'mapid')
    Reflect.deleteProperty(newAdmiration, 'open_id')
    let properties = Object.getOwnPropertyNames(newAdmiration)
    for (property of properties) {
        if (newAdmiration[property] && !oldAdmiration[property]) {
            await updateNumOfAdmiration(property, mapid, true)
        } else if (!newAdmiration[property] && oldAdmiration[property]) {
            await updateNumOfAdmiration(property, mapid, false)
        }
    }
}


async function updateNumOfAdmiration(propertyName, mapid, increaseOrNot) {
    let res = await mysql('map').select('author_id').where({
        mapid
    })
    let open_id = res[0].author_id
    if(increaseOrNot) {
        await mysql('user').increment('num_'+propertyName,1).where({open_id})
        await mysql('map').increment('num_'+propertyName,1).where({mapid})
    } else {
        await mysql('user').decrement('num_'+propertyName,1).where({open_id})
        await mysql('map').decrement('num_'+propertyName,1).where({mapid})
    }
}