import {
  ChatOps,
}             from 'wechaty-plugin-contrib'
import type { WeChatSettings } from '../../../settings/mod'

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
