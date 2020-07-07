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

import { CHATOPS_ROOM_ID }  from '../database'

import { VoteOutPlugin }            from './vote-out'
import { RoomInviterPluginList }    from './room-inviter'
import { FriendshipAccepterPlugin } from './friendship-accepter'
import { HeartbeatPlugin }          from './heartbeat'
import { EventHotHandlerPlugin }    from './event-hot-handler'
import { VorpalPlugin }             from './vorpal'
import {
  OneToManyPlugin,
  ManyToOnePlugin,
  ManyToManyPlugin,
  Bot5OneToManyPlugin,
}                           from './room-connector'

// import { IntercomPlugin }   from './intercom'
// import { FreshdeskPlugin }  from './freshdesk'
import {
  QnAMakerEnglishPlugin,
  QnAMakerChinesePlugin,
}                           from './qnamaker'

const pluginList = [
  QRCodeTerminal(),
  EventLogger(),
  DingDong(),
  ChatOps({ room: CHATOPS_ROOM_ID }),
  OneToManyPlugin,
  ManyToOnePlugin,
  ManyToManyPlugin,
  Bot5OneToManyPlugin,
  ...RoomInviterPluginList,
  FriendshipAccepterPlugin,
  HeartbeatPlugin,
  EventHotHandlerPlugin,
  VoteOutPlugin,
  VorpalPlugin,
  // IntercomPlugin,
  // FreshdeskPlugin,
  QnAMakerChinesePlugin,
  QnAMakerEnglishPlugin,
]

export { pluginList }
