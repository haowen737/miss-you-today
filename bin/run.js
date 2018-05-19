const config = require('../config')
const app = require('../app')
const http = require('http')
const chalk = require('chalk')
const debug = require('debug')('http')

const printf = console.log
const PORT = config.port

const onListening = () => {
  printf(chalk.green(`server is listening on port ${chalk.blue(PORT)}, started at ${chalk.blue(config.env)} mode`))
  // debug(`server is listening on port ${PORT}, started at ${config.env} mode`)
}
const server = http.createServer(app.callback())

server.listen(PORT)
server.on('listening', onListening)