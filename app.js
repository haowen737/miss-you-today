const Koa = require('koa')
const stastic = require('koa-static')
const bodyparser = require('koa-bodyparser')
const debug = require('debug')('koa')

const app = new Koa()
app.use(stastic(__dirname + '/client/build'))

app.use(bodyparser())

module.exports = app
