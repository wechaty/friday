import {
  RoomInviter,
  RoomInviterConfig,
}                       from 'wechaty-plugin-contrib'
import type { WeChatSettings } from '../../../../wechaty-settings/mod.js'

import {
  repeat,
  WECHATY_DEVELOPERS_ROOM_RULES,
  WECHATY_DEVELOPERS_ROOM_WELCOME,
}                                       from './config.js'

const getWechatyEnglishRoomInviter = (settings: WeChatSettings) => {
  const wechatyEnglishConfig: RoomInviterConfig = {
    password : [
      /^wechaty english$/i,
      /^english$/i,
    ],
    repeat,
    room: settings.rooms.wechatyDevelopers.english,
    rule: WECHATY_DEVELOPERS_ROOM_RULES,
    welcome: WECHATY_DEVELOPERS_ROOM_WELCOME,
  }

  const WechatyEnglishRoomInviter = RoomInviter(wechatyEnglishConfig)
  return WechatyEnglishRoomInviter
}

export {
  getWechatyEnglishRoomInviter,
}
