
const router = require('koa-router')()

const hey = require('./hey')
const routes = [
  hey
]

routes.map(
  r => router.use('/api', r.routes())
)

module.exports = router