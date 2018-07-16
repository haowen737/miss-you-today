const Koa = require('koa')
const stastic = require('koa-static')
const bodyparser = require('koa-bodyparser')
const debug = require('debug')('koa')
const { Swapi } = require('koa-swapi')
// const { Swapi } = require('../../KoaApii/built')

const deps = require('./deps')
const apis = require('./routes')

const app = new Koa()
const swapi = new Swapi()

app.use(stastic(__dirname + '/client/build'))

app.use(bodyparser())
app.use(deps)

swapi.register(app, {
  basePath: '/api',
  apis
})

module.exports = app
