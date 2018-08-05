import Swagger from 'swagger-client'
import * as https from "https"

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

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
      Swagger({ url: '/swagger.json', connectionAgent: httpsAgent })
        .then((res) => {
          console.log('swagger.json-->', res)
          this.apis = apiWrappper(res.apis)
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