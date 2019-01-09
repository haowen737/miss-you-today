const path = require('path')

module.exports = {
  env: 'development',
  port: 3007,
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '../db/development.db')
    },
    useNullAsDefault: true
  },
  log: {
    path: './logs'
  }
}
