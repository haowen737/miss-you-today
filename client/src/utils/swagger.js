import Swagger from 'swagger-client'

const internals = {}


internals.init = function () {
  Swagger('/swagger.json')
    .then((client) => {
      console.log('client', client)
    })
    .catch((err) => {

    })
}

export default internals