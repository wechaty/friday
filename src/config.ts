/// <reference path="./typings.d.ts" />
// https://github.com/motdotla/dotenv/issues/89#issuecomment-596083057
import 'dotenv/config.js'
import envVar from 'env-var'

import { pkg } from './pkg.js'

const VERSION = pkg?.version || '0.0.0'

/**
 * Env Vars
 */
const WEB_PORT = envVar.get('WEB_PORT')
  .default(8788)
  .asPortNumber()

export {
  VERSION,
  WEB_PORT,
}
