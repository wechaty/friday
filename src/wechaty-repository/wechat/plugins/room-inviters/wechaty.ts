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

const getWechatyRoomInviter = (settings: WeChatSettings) => {
  const wechatyConfig: RoomInviterConfig = {
    password : [
      /^wechaty$/i,
      /^plugin$/i,
    ],
    repeat,
    room: settings.rooms.wechatyDevelopers.home,
    rule: WECHATY_DEVELOPERS_ROOM_RULES,
    welcome: WECHATY_DEVELOPERS_ROOM_WELCOME,
  }

  const WechatyRoomInviter = RoomInviter(wechatyConfig)
  return WechatyRoomInviter
}

export {
  getWechatyRoomInviter,
}
