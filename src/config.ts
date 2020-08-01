import { VERSION } from './version'

require('dotenv').config()

/**
 * Env Vars
 */
const WEB_PORT = process.env.WEB_PORT || 8080

export {
  VERSION,
  WEB_PORT,
}
