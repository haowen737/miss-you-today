import Swagger from 'swagger-client'
import * as https from "https"

const httpsAgent = new https.Agent({ rejectUnauthorized: false })
const url = `${window.location.protocol}//localhost:3007/swagger.json`
// const url = `${window.location.protocol}//localhost:3002/swagger.json`
const apiWrappper = function (apis) {
  if (!apis) {
    throw new Error('api should be array')
  }
  const wrapped = {}
  Object.keys(apis).forEach(k => {
    const routes = apis[k]
    wrapped[k] = {}
    for (const key in routes) {
      if (routes.hasOwnProperty(key)) {
        const route = routes[key]
        wrapped[k][key] = routeWrapper(route)
      }
    }
  })

  console.log('---', wrapped)

  return wrapped
}

const routeWrapper = function (route) {
  return (params) => new Promise((resolve, reject) => {
    route(params)
      .then(res => {
        console.log('res----', res)
        const body = res.body
        resolve(body)
      })
      .catch(err => {
        reject(err)
      })
  })
}

const internals = {
  init: function () {
    return new Promise((resolve, reject) => {
      Swagger({ url })
        .then((client) => {
          console.log('swagger.json-->', client)
          client.spec.schemes = ['http']
          client.spec.host = 'localhost:3002'
          this.apis = apiWrappper(client.apis)
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  apis: {},
}

// Object.definePropertie(internals, 'apis', {
//   get: function () {
//     return c
//   }
// })

export {
  internals as default
}
