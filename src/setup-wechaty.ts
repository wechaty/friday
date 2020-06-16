import { Wechaty } from 'wechaty'

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

import {
  log,
}               from './config'

import { VoteOutPlugin }            from './plugins/vote-out'
import { RoomInviterPluginList }    from './plugins/room-inviter'
import { FriendshipAccepterPlugin } from './plugins/friendship-accepter'
import { HeartbeatPlugin }          from './plugins/heartbeat'
import { EventHotHandlerPlugin }    from './plugins/event-hot-handler'

import {
  OneToManyPlugin,
  ManyToOnePlugin,
  ManyToManyPlugin,
  Bot5OneToManyPlugin,
}                       from './plugins/room-connector'

import { CHATOPS_ROOM_ID } from './id-config'

export function setupWechatyPlugins (wechaty: Wechaty): void {
  log.verbose('startBot', 'startBot(%s)', wechaty)

  wechaty.use(
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
  )
}
