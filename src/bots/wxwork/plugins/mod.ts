/**
 * Wechaty Plugin Support with KickOut Example #1939
 *  https://github.com/wechaty/wechaty/issues/1939
 */
import {
  DingDong,
  EventLogger,
  QRCodeTerminal,
}                 from 'wechaty-plugin-contrib'

import { HeartbeatPlugin } from './heartbeat'

const pluginList = [
  DingDong(),
  EventLogger(),
  HeartbeatPlugin,
  QRCodeTerminal(),
]

export { pluginList }
