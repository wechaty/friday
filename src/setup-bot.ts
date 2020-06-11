import {
  Wechaty,
}                   from 'wechaty'

/**
 * Wechaty Plugin Support with KickOut Example #1939
 *  https://github.com/wechaty/wechaty/issues/1939
 */
import {
  QRCodeTerminal,
  EventLogger,
  DingDong,
}                    from 'wechaty-plugin-contrib'

import {
  log,
}               from './config'

import {
  crontab,
}             from './plugins'
import { VoteOutPlugin } from './plugins/vote-out'
import { RoomInviterPluginList } from './plugins/room-inviter'
import { FriendshipAccepterPlugin } from './plugins/friendship-accepter'
import { HeartbeatPlugin } from './plugins/heartbeat'
import {
  OneToManyPlugin,
  ManyToOnePlugin,
  ManyToManyPlugin,
  Bot5OneToManyPlugin,
}                       from './plugins/room-connector'

export async function setupBot (wechaty: Wechaty): Promise<void> {
  log.verbose('startBot', 'startBot(%s)', wechaty)

  wechaty
    .on('scan',         './handlers/on-scan')
    .on('error',        './handlers/on-error')
    .on('friendship',   './handlers/on-friendship')
    .on('logout',       './handlers/on-logout')
    .on('login',        './handlers/on-login')
    .on('message',      './handlers/on-message')
    .on('room-topic',   './handlers/on-room-topic')
    .on('room-invite',  './handlers/on-room-invite')
    .on('room-join',    './handlers/on-room-join')
    .on('room-leave',   './handlers/on-room-leave')

  wechaty.use(
    QRCodeTerminal(),
    EventLogger(),
    DingDong(),
    OneToManyPlugin,
    ManyToOnePlugin,
    ManyToManyPlugin,
    Bot5OneToManyPlugin,
    VoteOutPlugin,
    ...RoomInviterPluginList,
    FriendshipAccepterPlugin,
    HeartbeatPlugin,
  )

  await crontab()
}
