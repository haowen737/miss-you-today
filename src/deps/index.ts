import * as path from 'path'

import knex from './knex'
import logger from './logger'

const deps = async (ctx, next) => {
  ctx.knex = knex
  ctx.logger = logger
  await next()
}

export default deps
