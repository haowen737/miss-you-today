const KoaRouter = require('koa-router')
const methods = require('methods')
const debug = require('debug')('joi')
const Joi = require('joi')

class Koapi extends KoaRouter {
  constructor() {
    super()
    this.routes = []
    this.validTarget = ['query', 'params', 'body']
    this.router = new KoaRouter()
  }
  /**
   * add multiple middleware to koa-router 
   * 
   * @param {any} spec 
   * @memberof Koapi
   */
  _createRoute(spec) {
    const { method, path, handler, validate } = spec
    const route = this.router
    const validator = this.validator(validate)
    const middlewares = [
      validator,
      handler
    ]
    route[method].call(route, path, ...middlewares)
  }
  register(spec) {
    for (let i = 0; i < spec.length; i++) {
      const ele = spec[i]
      this.routes.push(ele)
      this._createRoute(ele)
    }
  }
  validator(validate) {
    const validTarget = this.validTarget
    return function (ctx, next) {
      validTarget.forEach(t => {
        const schema = validate[t]
        const data = ctx[t]

        if (schema) {
          console.log(ctx.body, ctx.request.body, ctx.params, ctx.query)
          Joi.validate(data, schema, (err, value) => {
            if (err) {
              ctx.status = 400;
              ctx.body = err
            }
          })
        }
      })
      next()
    }
  }
  loadApi() {
    return this.router.routes()
  }
  loadAllowedMethods() {
    return this.router.allowedMethods()
  }
}

module.exports = Koapi