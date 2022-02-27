/// <reference path="./typings.d.ts" />
// https://github.com/motdotla/dotenv/issues/89#issuecomment-596083057
import 'dotenv/config.js'

import { pkg } from './pkg.js'

const VERSION = pkg?.version || '0.0.0'

export {
  VERSION,
}
