import {
  ChatOps,
}             from 'wechaty-plugin-contrib'

import { fridayConfig } from '../deprecated.js'

const ChatOpsPlugin = ChatOps({
  blacklist: [
    'bot-sentry',
  ],
  room: fridayConfig.wechat.chatops.bot5,
})

export {
  ChatOpsPlugin,
}
