/// <reference path="./typings.d.ts" />
import { VERSION } from './legacy/version.js'

// https://github.com/motdotla/dotenv/issues/89#issuecomment-596083057
import 'dotenv/config.js'

/**
 * Env Vars
 */
const WEB_PORT = process.env['WEB_PORT']
  ? parseInt(process.env['WEB_PORT'])
  : 8788

export {
  VERSION,
  WEB_PORT,
}
