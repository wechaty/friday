/**
 * VERSION
 */
import readPkgUp from 'read-pkg-up'

import { KeywordRoomConfig } from './schema'

export {
  log,
}               from 'brolog'

const pkg = readPkgUp.sync({ cwd: __dirname })!.packageJson
export const VERSION = pkg.version

/**
 * Env Vars
 */
export const PORT = process.env.PORT || 8788

export const KEYWORD_ROOM_CONFIG: KeywordRoomConfig[] = [{
  keywords: [
    'wechaty',
    'Wechaty',
  ],
  rules: [],
  topic: 'Wechaty Developer\'s Home',
  welcomes: [],
}, {
  keywords: [
    'aidog',
    'Aidog',
    'AiDog',
  ],
  rules: [],
  topic: 'Youth fed the 5th dog',
  welcomes: [],
}]
