const path = require('path')
const fs = require('fs')
const config = require(path.resolve(__dirname, '../config'))
const app = require('../built/app')
const https = require('https')
const chalk = require('chalk')

const printf = console.log
const PORT = config.port

const options = {
  key: fs.readFileSync(path.resolve(__dirname, '../../../../ssl/server.key')),
  cert: fs.readFileSync(path.resolve(__dirname, '../../../../ssl/server.crt'))
}

const onListening = () => {
  printf(chalk.green(`ssl server is listening on port ${chalk.blue(PORT)}, started at ${chalk.blue(config.env)} mode`))
}
const sslServer = https.createServer(options, app.callback())

sslServer.listen(PORT)

sslServer.on('listening', onListening)
app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});