import {
  Bot5Assistant,
}                 from 'wechaty-bot5-assistant'

import { fridayConfig } from '../../../config/deprecated.js'

const [_next, current, ..._previous] = fridayConfig.wechat.bot5Club.rooms

const Bot5AssistantPlugin = Bot5Assistant({
  room: [
    current,
    /^BOT5 Assistant/i,       // room topic
  ],
})

export {
  Bot5AssistantPlugin,
}
