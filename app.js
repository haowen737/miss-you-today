const Koa = require('koa')
const stastic = require('koa-static')
const bodyparser = require('koa-bodyparser')
// const meltRoutes = require('./utils/meltRoute')
// const api = require('./routes/jooi')
const debug = require('debug')('koa')

const app = new Koa()
// app.swagger({})
app.use(stastic(__dirname + '/client/build'))

app.use(bodyparser())
// app.use(api.load(), api.allowedMethods())

// app.use(api.middleware())

module.exports = app