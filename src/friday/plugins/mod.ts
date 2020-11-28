/**
 * Wechaty Plugin Support with KickOut Example #1939
 *  https://github.com/wechaty/wechaty/issues/1939
 */
import {
  QRCodeTerminal,
  EventLogger,
  DingDong,
  ChatOps,
}                    from 'wechaty-plugin-contrib'

import { FRIDAY_ROOM_ID }  from '../../database'

import { VoteOutPlugin }            from './vote-out'
import { FriendshipAccepterPlugin } from './friendship-accepter'
import { HeartbeatPlugin }          from './heartbeat'
import { EventHotHandlerPlugin }    from './event-hot-handler'

// import { IntercomPlugin }   from './intercom'
// import { FreshdeskPlugin }  from './freshdesk'

import {
  QnAMakerEnglishPlugin,
  QnAMakerChinesePlugin,
}                           from './qnamaker'

import * as RoomInviterPluginMod    from './room-inviters/mod'
import * as RoomConnectorPluginMod  from './room-connectors/mod'

const pluginList = [
  QRCodeTerminal(),
  EventLogger(),
  DingDong(),
  ChatOps({ room: FRIDAY_ROOM_ID }),
  FriendshipAccepterPlugin,
  HeartbeatPlugin,
  EventHotHandlerPlugin,
  VoteOutPlugin,
  // IntercomPlugin,
  // FreshdeskPlugin,

  QnAMakerChinesePlugin,
  QnAMakerEnglishPlugin,

  ...Object.values(RoomInviterPluginMod),
  ...Object.values(RoomConnectorPluginMod),
]

export { pluginList }
