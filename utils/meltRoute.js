const KoaRouter = require('koa-router')
const methods = require('methods')
const Joi = require('joi')

const routes = require('../routes/jooi')

const printf = console.log

class Router extends KoaRouter {
  constructor() {
    super()
  }
}

const router = new Router()
const koaRouter = new KoaRouter()

printf(router.get, '---', koaRouter.get)

methods.forEach(method => {
  // printf(method)
})

const meltRoute = function () {
  const theRoutes = []
  
  routes.map(route => {
    const { method, path, handler } = route
    const theRouter = router[method]
    const theRoute = router.get(path, handler)

    theRoutes.push(theRoute)
  })

  return router
}
module.exports = meltRoute
