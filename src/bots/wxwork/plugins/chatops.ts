import {
  ChatOps,
}             from 'wechaty-plugin-contrib'

import { WXWORK_FRIDAY_ROOM_ID } from '../../../database'

const ChatOpsPlugin = ChatOps({
  room: WXWORK_FRIDAY_ROOM_ID,
})

export {
  ChatOpsPlugin,
}
