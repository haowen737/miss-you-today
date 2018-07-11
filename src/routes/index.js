const { api } = require('koa-swapi')

const articleSchemas = require('./article')
const articleController = require('../controller/article')

module.exports = [
  api.schemas(articleSchemas).handler(articleController)
]
