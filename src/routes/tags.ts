import * as Joi from 'joi'
import { Route, Validator } from 'koa-swapi'

const Article = Joi.object({
  id: Joi.number(),
  title: Joi.string(),
  content: Joi.string()
}).label('文章对象').description('文章对象的详情')

export default [

  Route
    .get('/tags')
    .summary('标签列表')
    .tags(['tags'])
    .validate(
      Validator
        .output({
          data: Joi.array().items(Article)
        })
    )
    .create('getTags'),

  Route
    .get('/tags/articles')
    .summary('标签列表')
    .tags(['tags'])
    .validate(
      Validator
        .query({
          tag: Joi.string()
        })
        .output({
          data: Joi.array().items(Article)
        })
    )
    .create('getArticles')
]
