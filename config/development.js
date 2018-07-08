module.exports = {
  env: 'development',
  port: 8081,
  sqlite: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, '../db/development.db')
    }
  }
}
