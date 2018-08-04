import * as knex from 'knex'
import * as config from '../../config'

export default knex(config.sqlite)
