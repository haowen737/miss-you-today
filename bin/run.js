const path = require('path')
const fs = require('fs')
const config = require(path.resolve(__dirname, '../config'))
const app = require('../built/app')
const http = require('http')
const https = require('https')
const chalk = require('chalk')
const debug = require('debug')('http')

const printf = console.log
const PORT = config.port

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../../../../ssl/server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../../../../ssl/server.crt'))
}

const onListening = () => {
  printf(chalk.green(`server is listening on port ${chalk.blue(PORT)}, started at ${chalk.blue(config.env)} mode`))
}
const server = http.createServer(app.callback())
const sslServer = https.createServer(options, app.callback())

server.listen(PORT)
sslServer.listen(3003)

server.on('listening', onListening)
sslServer.on('listening', () => { console.log('ssl server start') })
app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});