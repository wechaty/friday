import {
  Bot5Assistant,
}                 from 'wechaty-bot5-assistant'

import * as BOT5 from '../../database/bot5.js'

const Bot5AssistantPlugin = Bot5Assistant({
  room: [
    BOT5.member[0], // room id
    /^BOT5 /,       // room topic
  ],
})

export {
  Bot5AssistantPlugin,
}
