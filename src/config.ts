import { VERSION } from './version'

require('dotenv').config()

/**
 * Env Vars
 */
const PORT = process.env.PORT || 8080

export {
  VERSION,
  PORT,
}
