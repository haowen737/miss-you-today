const Koa = require('koa')
const stastic = require('koa-static')
const bodyparser = require('koa-bodyparser')
const meltRoutes = require('./utils/meltRoute')
// const api = require('./routes')
// const api = require('./routes/jooi')
const api = meltRoutes()
const app = new Koa()

// app.use(stastic(__dirname + '/client/build'))
app.use(api.routes(), api.allowedMethods())

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

// app.use(api.middleware())

module.exports = app