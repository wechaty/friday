/**
 * Wechaty Plugin Support with KickOut Example #1939
 *  https://github.com/wechaty/wechaty/issues/1939
 */
import {
  DingDong,
}                 from 'wechaty-plugin-contrib'

import { HeartbeatPlugin }      from './heartbeat'
import { ChatopsVorpalPlugin }  from './chatops'

const pluginList = [
  DingDong(),
  HeartbeatPlugin,
  ChatopsVorpalPlugin,
]

export { pluginList }
