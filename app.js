const Koa = require('koa')
const stastic = require('koa-static')
const bodyparser = require('koa-bodyparser')
const meltRoutes = require('./utils/meltRoute')
// const api = require('./routes')
const api = require('./routes/jooi')

// const api = new Koapi()
const app = new Koa()

// console.log(api.loadApi())
// app.use(stastic(__dirname + '/client/build'))
app.use(api.loadApi(), api.loadAllowedMethods())

app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))

// app.use(api.middleware())

module.exports = app