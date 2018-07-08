
const Joi = require('joi')

module.exports = [{
  method: 'get',
  path: '/articles',
  summary: '获取文章列表',
  validate: {
    query: {
    },
    type: 'form',
    output: {
      200: {
      }
    }
  }
}]