/**
 * Wechaty Plugin Support with KickOut Example #1939
 *  https://github.com/wechaty/wechaty/issues/1939
 */
import {
  DingDong,
  EventLogger,
  QRCodeTerminal,
}                 from 'wechaty-plugin-contrib'

import type { WorkProSettings } from '../../../../wechaty-settings/mod.js'

import { getHeartbeatPlugin }   from './heartbeat.js'
import { getChatOpsPlugin }     from './chatops.js'
import { getVorpalPluginList }  from './vorpals/mod.js'

const getPlugins = (settings: WorkProSettings) => {

  const pluginList = [
    getChatOpsPlugin(settings.chatOpsRoomId),
    DingDong(),
    EventLogger(),
    getHeartbeatPlugin(settings.heartbeatRoomId),
    QRCodeTerminal(),
  ]

  return [
    ...pluginList,
    ...getVorpalPluginList(settings),
  ]
}

export { getPlugins }
