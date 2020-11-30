/**
 * Wechaty Plugin Support with KickOut Example #1939
 *  https://github.com/wechaty/wechaty/issues/1939
 */
import {
  QRCodeTerminal,
  EventLogger,
  DingDong,
  // ChatOps,
}                    from 'wechaty-plugin-contrib'

// import { FRIDAY_ROOM_ID }  from '../../database'

import { VoteOutPlugin }            from './vote-out'
import { FriendshipAccepterPlugin } from './friendship-accepter'
import { EventHotHandlerPlugin }    from './event-hot-handler'

// import { IntercomPlugin }   from './intercom'
// import { FreshdeskPlugin }  from './freshdesk'

import {
  QnAMakerEnglishPlugin,
  QnAMakerChinesePlugin,
}                           from './qnamaker'

/**
 * Huan(20201130): Friday.BOT has been disabled by Tencent
 *  See: https://github.com/wechaty/friday/issues/62
 */
// import { HeartbeatPlugin }          from './heartbeat'
// import * as RoomInviterPluginMod    from './room-inviters/mod'
// import * as RoomConnectorPluginMod  from './room-connectors/mod'
import { WechatyDingDongPlugin } from './ding-dong/mod'

const pluginList = [
  QRCodeTerminal(),
  EventLogger(),
  DingDong(),
  FriendshipAccepterPlugin,
  EventHotHandlerPlugin,
  VoteOutPlugin,
  // IntercomPlugin,
  // FreshdeskPlugin,

  QnAMakerChinesePlugin,
  QnAMakerEnglishPlugin,

  /**
   * Huan(20201130): Friday.BOT has been disabled by Tencent
   *  See: https://github.com/wechaty/friday/issues/62
   */
  // HeartbeatPlugin,
  // ChatOps({ room: FRIDAY_ROOM_ID }),
  // ...Object.values(RoomInviterPluginMod),
  // ...Object.values(RoomConnectorPluginMod),
  WechatyDingDongPlugin,
]

export { pluginList }
