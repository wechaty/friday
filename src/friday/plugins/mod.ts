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
import * as roomInviterPluginMod    from './room-inviter'
import { FriendshipAccepterPlugin } from './friendship-accepter'
import { HeartbeatPlugin }          from './heartbeat'
import { EventHotHandlerPlugin }    from './event-hot-handler'

// import { IntercomPlugin }   from './intercom'
// import { FreshdeskPlugin }  from './freshdesk'

import {
  QnAMakerEnglishPlugin,
  QnAMakerChinesePlugin,
}                           from './qnamaker'

import {
  OneToManyPlugin,
  ManyToOnePlugin,
  ManyToManyPlugin,
  Bot5OneToManyPlugin,
}                           from './room-connector'

const pluginList = [
  QRCodeTerminal(),
  EventLogger(),
  DingDong(),
  ChatOps({ room: FRIDAY_ROOM_ID }),
  ...Object.values(roomInviterPluginMod),
  FriendshipAccepterPlugin,
  HeartbeatPlugin,
  EventHotHandlerPlugin,
  VoteOutPlugin,
  // IntercomPlugin,
  // FreshdeskPlugin,

  QnAMakerChinesePlugin,
  QnAMakerEnglishPlugin,

  ManyToOnePlugin,
  ManyToManyPlugin,
  Bot5OneToManyPlugin,
  OneToManyPlugin,
]

export { pluginList }
