const KoaRouter = require('koa-router')
const methods = require('methods')
const Joi = require('joi')

class Koapi extends KoaRouter {
  constructor() {
    super()
    this.routes = []
    this.router = new KoaRouter()
  }
  _createRoute(spec) {
    const { method, path, handler } = spec
    const route = this.router
    route[method].call(route, path, handler)
  }
  register(spec) {
    this.routes.push(spec)
    this._createRoute(spec)
  }
  
  loadApi() {
    return this.router.routes()
  }
  loadAllowedMethods() {
    return this.router.allowedMethods()
  }
}

methods.forEach(method => {
  // printf(method)
  Koapi.prototype[method] = KoaRouter
  // console.log(KoaRouter)
})

module.exports = Koapi