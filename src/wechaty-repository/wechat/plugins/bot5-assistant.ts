import {
  Bot5Assistant,
}                 from 'wechaty-bot5-assistant'

import { botSettings } from '../../../wechaty-settings/deprecated.js'

const [_next, current, ..._previous] = botSettings.weChat.rooms.bot5Club.rooms

const Bot5AssistantPlugin = Bot5Assistant({
  room: [
    current,
    /^BOT5 Assistant/i,       // room topic
  ],
})

export {
  Bot5AssistantPlugin,
}
