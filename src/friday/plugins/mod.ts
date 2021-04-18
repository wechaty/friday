/**
 * Wechaty Plugin Support with KickOut Example #1939
 *  https://github.com/wechaty/wechaty/issues/1939
 */
import {
  QRCodeTerminal,
  EventLogger,
  DingDong,
}                    from 'wechaty-plugin-contrib'

import { VoteOutPlugin }            from './vote-out'
import { FriendshipAccepterPlugin } from './friendship-accepter'
import { EventHotHandlerPlugin }    from './event-hot-handler'
import { ChatOpsPlugin }            from './chatops'
import { RoomInvitationAccepterPlugin } from './room-invitation-accepter'

// import { IntercomPlugin }   from './intercom'
// import { FreshdeskPlugin }  from './freshdesk'

// import {
//   QnAMakerEnglishPlugin,
//   QnAMakerChinesePlugin,
// }                           from './qnamaker'

/**
 * Huan(20201130): Friday.BOT has been disabled by Tencent
 *  See: https://github.com/wechaty/friday/issues/62
 * Huan(20201203): Resolved
 */
// import { WechatyDingDongPlugin } from './ding-dong/mod'

import { HeartbeatPlugin }          from './heartbeat'
import * as RoomInviterPluginMod    from './room-inviters/mod'
import * as RoomConnectorPluginMod  from './room-connectors/mod'

const pluginList = [
  QRCodeTerminal(),
  EventLogger(),
  DingDong(),
  FriendshipAccepterPlugin,
  EventHotHandlerPlugin,
  VoteOutPlugin,
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

  HeartbeatPlugin,
  ChatOpsPlugin,

  ...Object.values(RoomInviterPluginMod),
  ...Object.values(RoomConnectorPluginMod),
]

export { pluginList }
