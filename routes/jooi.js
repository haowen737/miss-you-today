
const Joi = require('joi')
const Koapi = require('../../KoaApii/')
const koapi = new Koapi()

const jooi = [{
  method: 'get',
  path: '/api/jooi/get/:id',
  validate: {
    params: {
      id: Joi.number().integer().min(2).max(4)
    },
    query: {
      name: Joi.string().required().min(3).max(100),
      sex: Joi.number().required().integer().min(2).max(4)
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
}, {
    method: 'get',
    path: '/api/jooi/get2',
    validate: {
      query: {
        name: Joi.string().required().min(3).max(100),
        sex: Joi.number().required().integer().min(2).max(4)
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
  }, {
  method: 'post',
  path: '/api/jooi/update',
  validate: {
    body: {
      name: Joi.string().min(3).max(100)
    },
    type: 'form',
    output: {
      200: {
        body: {
          name: Joi.string()
        }
      }
    }
  },
  handler: async (ctx) => {
    ctx.status = 201;
    ctx.body = {
      name: '123123'
    }
  }
}]

koapi.register(jooi)

module.exports = koapi