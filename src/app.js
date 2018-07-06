const Koa = require('koa')
const stastic = require('koa-static')
const bodyparser = require('koa-bodyparser')
const debug = require('debug')('koa')
const {Swapi} = require('koa-swapi')

const app = new Koa()
const swapi = new Swapi()

swapi.register(app, { basePath: '/v1' })
app.use(stastic(__dirname + '/client/build'))

app.use(bodyparser())

module.exports = app
