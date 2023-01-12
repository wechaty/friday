import {
  ChatOps,
}             from 'wechaty-plugin-contrib'
import type { WorkProSettings } from '../../../../wechaty-settings/mod.js'

const getChatOpsPlugin = (settings: WorkProSettings) => {
  const ChatOpsPlugin = ChatOps({
    blacklist: [
      'bot-sentry',
    ],
    room: settings.rooms.chatops.friday,
  })
  return ChatOpsPlugin
}

export {
  getChatOpsPlugin,
}
