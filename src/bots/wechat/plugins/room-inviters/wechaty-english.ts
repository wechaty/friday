import {
  RoomInviter,
  RoomInviterConfig,
}                       from 'wechaty-plugin-contrib'

import { fridayConfig } from '../../../../config/deprecated.js'

import {
  repeat,
  WECHATY_DEVELOPERS_ROOM_RULES,
  WECHATY_DEVELOPERS_ROOM_WELCOME,
}                                       from './config.js'

const wechatyEnglishConfig: RoomInviterConfig = {
  password : [
    /^wechaty english$/i,
    /^english$/i,
  ],
  repeat,
  room: fridayConfig.wechat.wechatyDevelopers.english,
  rule: WECHATY_DEVELOPERS_ROOM_RULES,
  welcome: WECHATY_DEVELOPERS_ROOM_WELCOME,
}

const WechatyEnglishRoomInviter = RoomInviter(wechatyEnglishConfig)

export {
  WechatyEnglishRoomInviter,
}
