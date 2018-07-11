
const Joi = require('joi')

module.exports = [{
  method: 'get',
  path: '/articles',
  config: {
    tags: ['article'],
    id: 'getList',
    summary: '获取文章列表',
    validate: {
      query: {
      },
      type: 'form',
      output: {}
    }
  }
}, {
  method: 'get',
  path: '/article/ls',
  config: {
    tags: ['article'],
    id: 'getArticle',
    summary: '获取文章',
    validate: {
      query: {
        id: Joi.number()
      },
      type: 'form',
      output: {}
    }
  }
}]

// module.exports = [

//   schema
//     .id('getList')
//     .get('/article')
//     .summary('xxxx')
//     .validate(validate.getList)
//     .create(),

//   schema
//     .id('getArticle')
//     .post('/article')
//     .summary('xxxx')
//     .validate(validate.getList)
//     .create()

// ]
