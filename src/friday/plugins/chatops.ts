import {
  ChatOps,
}             from 'wechaty-plugin-contrib'

import { FRIDAY_ROOM_ID } from '../../database'

const ChatOpsPlugin = ChatOps({
  blacklist: [
    'bot-sentry',
  ],
  room: FRIDAY_ROOM_ID,
})

export {
  ChatOpsPlugin,
}
