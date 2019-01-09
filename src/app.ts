import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import * as serve from 'koa-static'
import * as mount from 'koa-mount'
import { Swapi } from 'koa-swapi'
// import { Swapi } from '../../KoaApii/built'
import * as helmet from 'koa-helmet'
import * as cors from '@koa/cors'
import * as path from 'path'
import deps from './deps'
import apis from './routes'
import swapiMiddleware from './utils/swapiMiddleware'
import logger from './deps/logger'

const app = new Koa()
const swapi = new Swapi()

app.use(cors())
app.use(helmet())
app.use(bodyparser())
app.use(deps)
app.use(mount('/', serve(path.resolve(__dirname, '../client/build'))))
// app.use(mount('/', () => ))

swapi.register(app, {
  basePath: '/api',
  middleware: [swapiMiddleware],
  swagger: {
    schemes: ['https', 'http'],
  },
  logger,
  apis
})

export = app
