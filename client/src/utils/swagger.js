import Swagger from 'swagger-client'

const internals = {}


internals.init = function () {
  return Swagger('/swagger.json')
}

export default internals