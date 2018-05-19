const development = require('./development')
const production = require('./production')

const env = process.env.NODE_ENV || 'development'
console.log('env------>', env)
module.exports = {
  development,
  production
}[env]