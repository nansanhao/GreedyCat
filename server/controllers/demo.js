
const { mysql } = require('../qcloud.js')
let a =  mysql('cAppinfo').table('USER').select('id')
module.exports = ctx => {
    
  ctx.state.data = {
      
      msg: a
  }
}