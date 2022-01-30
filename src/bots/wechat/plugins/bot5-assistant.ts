import {
  Bot5Assistant,
}                 from 'wechaty-bot5-assistant'

import { fridaySetting } from '../../../setting/deprecated.js'

const [_next, current, ..._previous] = fridaySetting.wechat.bot5Club.rooms

const Bot5AssistantPlugin = Bot5Assistant({
  room: [
    current,
    /^BOT5 Assistant/i,       // room topic
  ],
})

export {
  Bot5AssistantPlugin,
}
