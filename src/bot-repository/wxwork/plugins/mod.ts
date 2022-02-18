/**
 * Wechaty Plugin Support with KickOut Example #1939
 *  https://github.com/wechaty/wechaty/issues/1939
 */
import {
  DingDong,
  EventLogger,
  QRCodeTerminal,
}                 from 'wechaty-plugin-contrib'

import { getHeartbeatPlugin } from './heartbeat.js'
import { getChatOpsPlugin } from './chatops.js'

import { vorpalPluginList } from './vorpals/mod.js'

interface PluginOptions {
  chatOpsRoomId: string,
  heartbeatRoomId: string,
}

const getPlugins = (options: PluginOptions) => {

  const pluginList = [
    getChatOpsPlugin(options.chatOpsRoomId),
    DingDong(),
    EventLogger(),
    getHeartbeatPlugin(options.heartbeatRoomId),
    QRCodeTerminal(),
  ]

  return [
    ...pluginList,
    ...vorpalPluginList,
  ]
}

export { getPlugins }
