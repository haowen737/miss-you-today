// const { Api } = require('../../../KoaApii/built')
const { Api } = require('koa-swapi')

const articleSchemas = require('./article')
const articleController = require('../controller/article')

module.exports = [
  Api.schemas(articleSchemas).handler(articleController)
]
