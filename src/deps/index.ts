import * as path from 'path'

import knex from './knex'

const deps = async (ctx, next) => {
  ctx.knex = knex
  await next()
}

export default deps
