import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import * as stastic from 'koa-static'
import { Swapi } from 'koa-swapi'

import deps from './deps'
import apis from './routes'

const app = new Koa()
const swapi = new Swapi()

app.use(stastic(__dirname + '/client/build'))

app.use(bodyparser())
app.use(deps)

swapi.register(app, {
  basePath: '/api',
  apis
})

export = app
