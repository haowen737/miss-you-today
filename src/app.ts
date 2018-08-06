import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import * as serve from 'koa-static'
import * as mount from 'koa-mount'
import { Swapi } from 'koa-swapi'
// import * as helmet from 'koa-helmet'
// import * as cors from '@koa/cors'
import * as path from 'path'
import deps from './deps'
import apis from './routes'

const app = new Koa()
const swapi = new Swapi()

// app.use(cors())
// app.use(helmet())
app.use(bodyparser())
app.use(deps)
app.use(mount('/', serve(path.resolve(__dirname, '../client/build'))))

swapi.register(app, {
  basePath: '/api',
  swagger: {
    schemes: ['https'],
  },
  apis
})

export = app
