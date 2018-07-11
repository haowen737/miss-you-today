const config = require('../../config')
const knex = require('knex')(config.sqlite)

module.exports = knex