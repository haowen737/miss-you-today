const development = require('./development')
const production = require('./production')
const env = process.env.NODE_ENV || 'development'

module.exports = {
  development,
  production
}[env]