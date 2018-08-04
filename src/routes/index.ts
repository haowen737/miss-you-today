import { Api } from 'koa-swapi'

import articleController from '../controller/article'
import articleSchemas from './article'

export default [
  Api.schemas(articleSchemas).handler(articleController)
]
