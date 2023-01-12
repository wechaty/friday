import {
  Bot5Assistant,
}                 from 'wechaty-bot5-assistant'
import type { WeChatSettings } from '../../../../wechaty-settings/mod.js'

const getBot5AssistantPlugin = (settings: WeChatSettings) => {
  const [ _next, current, ..._previous ] = settings.rooms.bot5Club.rooms

  const Bot5AssistantPlugin = Bot5Assistant({
    room: [
      current,
      /^BOT5 Assistant/i,       // room topic
    ],
  })
  return Bot5AssistantPlugin
}

export {
  getBot5AssistantPlugin,
}
