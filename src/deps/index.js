const knex = require('./knex')

const deps = async (ctx, next) => {
  ctx.knex = knex
  await next()
}

module.exports = deps