const path = require('path')
const fs = require('fs')
const config = require(path.resolve(__dirname, '../config'))
const app = require('../built/app')
const http = require('http')
const https = require('https')
const chalk = require('chalk')

const printf = console.log
const PORT = config.port

const onListening = () => {
  printf(chalk.green(`server is listening on port ${chalk.blue(PORT)}, started at ${chalk.blue(config.env)} mode`))
}
const server = http.createServer(app.callback())

server.listen(PORT)
server.on('listening', onListening)
app.on('error', (err, ctx) => {
  ctx.logger.error('server error', err, ctx)
})
