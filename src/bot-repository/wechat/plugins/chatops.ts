import {
  ChatOps,
}             from 'wechaty-plugin-contrib'

import { botSettings } from '../../../bot-settings/deprecated.js'

const ChatOpsPlugin = ChatOps({
  blacklist: [
    'bot-sentry',
  ],
  room: botSettings.weChat.rooms.chatops.friday,
})

export {
  ChatOpsPlugin,
}
