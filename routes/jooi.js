
const Joi = require('joi')
const Koapi = require('../utils/koapi')

const koapi = new Koapi()

koapi.register({
  method: 'get',
  path: '/jooi',
  validate: {
    params: {
      name: Joi.string().max(100)
    },
    type: 'form',
    output: {
      200: {
        body: Joi.string()
      }
    }
  },
  handler: async (ctx) => {
    ctx.status = 201;
    ctx.body = 'joooi ok!!'
  }
})

module.exports = koapi