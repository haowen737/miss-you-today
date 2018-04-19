const routes = require('../routes/jooi')
const api = require('./koapi')
const Koapi = require('../utils/koapi')

const printf = console.log

const router = new Koapi()

console.log(router.loadApi())

const meltRoute = function () {
  // console.log(api)
  return router.loadApi()
}

module.exports = meltRoute
