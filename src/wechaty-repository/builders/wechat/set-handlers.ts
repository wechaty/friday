import type { Wechaty } from 'wechaty'
import type { WeChatSettings } from '../../settings/mod.js'

import onError        from './handlers/on-error.js'
import { getOnFriendship }   from './handlers/on-friendship.js'
import onLogin        from './handlers/on-login.js'
import onLogout       from './handlers/on-logout.js'
import onMessage      from './handlers/on-message.js'
import onRoomInvite   from './handlers/on-room-invite.js'
import onRoomJoin     from './handlers/on-room-join.js'
import onRoomLeave    from './handlers/on-room-leave.js'
import onRoomTopic    from './handlers/on-room-topic.js'
import onScan         from './handlers/on-scan.js'

const setHandlers = (wechaty: Wechaty, settings: WeChatSettings) => {
  wechaty.on('error',       onError)
  wechaty.on('friendship',  getOnFriendship(settings))
  wechaty.on('login',       onLogin)
  wechaty.on('logout',      onLogout)
  wechaty.on('message',     onMessage)
  wechaty.on('room-invite', onRoomInvite)
  wechaty.on('room-join',   onRoomJoin)
  wechaty.on('room-leave',  onRoomLeave)
  wechaty.on('room-topic',  onRoomTopic)
  wechaty.on('scan',        onScan)
}

export {
  setHandlers,
}
