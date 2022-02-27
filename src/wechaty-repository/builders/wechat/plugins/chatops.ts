import {
  ChatOps,
}             from 'wechaty-plugin-contrib'
import type { WeChatSettings } from '../../../../wechaty-settings/mod.js'

const getChatOpsPlugin = (settings: WeChatSettings) => {
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
