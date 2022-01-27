import {
  Bot5Assistant,
}                 from 'wechaty-bot5-assistant'

import * as BOT5 from '../../database/bot5.js'

const [_next, current, ..._previous] = BOT5.rooms

const Bot5AssistantPlugin = Bot5Assistant({
  room: [
    current,
    /^BOT5 Assistant/i,       // room topic
  ],
})

export {
  Bot5AssistantPlugin,
}
