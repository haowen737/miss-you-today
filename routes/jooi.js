
const Joi = require('joi')

const jooi = {
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
}

module.exports = [jooi]