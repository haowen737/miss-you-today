const router = require('koa-router')()

router.get('/hey', (ctx, next) => {
  ctx.body = 'hello there!'
})

module.exports = router