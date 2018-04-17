const Koa = require('koa')
const Router = require('koa-router')


const app = new Koa()
const router = new Router()

router.get('/api/hey', (ctx, next) => {
  ctx.body = '123123'
})

app.use(require('koa-static')(__dirname + '/client/build'))
app
  .use(router.routes())
  .use(router.allowedMethods());
module.exports = app