import {
  ChatOps,
}             from 'wechaty-plugin-contrib'

import { fridaySetting } from '../../../settings/deprecated.js'

const ChatOpsPlugin = ChatOps({
  blacklist: [
    'bot-sentry',
  ],
  room: fridaySetting.wechat.chatops.bot5,
})

export {
  ChatOpsPlugin,
}
