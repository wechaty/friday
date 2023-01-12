/**
 * Wechaty Plugin Support with KickOut Example #1939
 *  https://github.com/wechaty/wechaty/issues/1939
 */
import {
  QRCodeTerminal,
  EventLogger,
  DingDong,
}                    from 'wechaty-plugin-contrib'

import { getVoteOutPlugin }                  from './vote-out.js'
import { FriendshipAccepterPlugin }       from './friendship-accepter.js'
import { getChatOpsPlugin }                  from './chatops.js'
import { RoomInvitationAccepterPlugin }   from './room-invitation-accepter.js'
// import { Bot5AssistantPlugin }            from './bot5-assistant.js'

// import { IntercomPlugin }   from './intercom.js'
// import { FreshdeskPlugin }  from './freshdesk.js'

// import {
//   QnAMakerEnglishPlugin,
//   QnAMakerChinesePlugin,
// }                           from './qnamaker.js'

/**
 * Huan(20201130): Friday.BOT has been disabled by Tencent
 *  See: https://github.com/wechaty/friday/issues/62
 * Huan(20201203): Resolved
 */
// import { WechatyDingDongPlugin } from './ding-dong/mod.js'

import { getHeartbeatPlugin }          from './heartbeat.js'
import * as RoomInviterPluginMod    from './room-inviters/mod.js'
import * as RoomConnectorPluginMod  from './room-connectors/mod.js'

import { getVorpalPlugins } from './vorpals/mod.js'
import type { WorkProSettings } from '../../../../wechaty-settings/mod.js'

const getPlugins = (
  settings: WorkProSettings,
) => {
  const pluginList = [
    // Bot5AssistantPlugin,
    QRCodeTerminal(),
    EventLogger(),
    DingDong({
      contact: contact =>
        contact.id !== 'wxid_5nmxxj32x1qz22', // 张三
    }),
    FriendshipAccepterPlugin,
    getVoteOutPlugin(settings),
    RoomInvitationAccepterPlugin,
    // IntercomPlugin,
    // FreshdeskPlugin,

    // QnAMakerChinesePlugin,
    // QnAMakerEnglishPlugin,

    /**
     * Huan(20201130): Friday.BOT has been disabled by Tencent
     *  See: https://github.com/wechaty/friday/issues/62
     * Huan(20201203): Resolved
     */
    // WechatyDingDongPlugin,

    getHeartbeatPlugin(settings),
    getChatOpsPlugin(settings),

    ...Object.values(RoomInviterPluginMod).map(get => get(settings)).flat(),
    ...Object.values(RoomConnectorPluginMod).map(get => get(settings)),
  ]

  // void pluginList
  // void getVorpalPlugins
  return [
    ...pluginList,
    ...getVorpalPlugins(settings),
  ]
}

export { getPlugins }
