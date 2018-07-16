const Joi = require('joi')
// const { Route, Validator } = require('../../../KoaApii/built')
const { Route, Validator } = require('koa-swapi')

const Article = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
  content: Joi.string()
}).label('文章对象').description('文章对象的详情')

module.exports = [

  Route
    .get('/articles')
    .summary('文章列表')
    .tags(['article'])
    .validate(
      Validator
        .output({
          data: Joi.array().items(Article)
        })
    )
    .create('getList'),

  Route
    .get('/article')
    .summary('文章')
    .tags(['article'])
    .validate(
      Validator
        .query({
          id: Joi.number()
        })
        .output({
          data: Article
        })
    )
    .create('getArticle'),

    Route
      .put('/article')
      .summary('更新文章信息')
      .description('更新阅读量等信息')
      .tags(['article'])
      .validate(
        Validator
          .payload(Article)
      )
      .create('update')
]
