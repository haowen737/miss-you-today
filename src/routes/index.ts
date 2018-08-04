import { Api } from 'koa-swapi'

import articleController from '../controller/article'
import articleSchemas from './article'

import tagsController from '../controller/tags'
import tagsSchemas from './tags'


export default [
  Api.schemas(articleSchemas).handler(articleController),
  Api.schemas(tagsSchemas).handler(tagsController),
]
