import {
  RoomInviter,
  RoomInviterConfig,
}                       from 'wechaty-plugin-contrib'
import type { WeChatSettings } from '../../../../../wechaty-settings/mod.js'

const getBot5RoomInviter = (settings: WeChatSettings) => {
  const bot5Config: RoomInviterConfig = {
    password: [
      /^bot5$/i,
      /^BotFriday$/i,
      /^Bot Friday$/i,
      /^friday$/i,
    ],
    room: settings.rooms.bot5Club.rooms[1],  // <- [1] is the current year member room
    rule: [
      "I'm trying to invite you into Bot5, please read the manual first: https://www.bot5.club/manuals/newcomer",
    ],
    welcome: [
      'Welcome to join us!',
    ],
  }

  const Bot5RoomInviter = RoomInviter(bot5Config)
  return Bot5RoomInviter
}

export {
  getBot5RoomInviter,
}
