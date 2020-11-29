import {
  RoomInviter,
  RoomInviterConfig,
}                       from 'wechaty-plugin-contrib'

import {
  DEVELOPERS_ROOM_ID_ENGLISH,
}                             from '../../../database'

import {
  repeat,
  WECHATY_DEVELOPERS_ROOM_RULES,
  WECHATY_DEVELOPERS_ROOM_WELCOME,
}                                       from './config'

const wechatyEnglishConfig: RoomInviterConfig = {
  password : [
    /^wechaty english$/i,
    /^english$/i,
  ],
  repeat,
  room: DEVELOPERS_ROOM_ID_ENGLISH,
  rule: WECHATY_DEVELOPERS_ROOM_RULES,
  welcome: WECHATY_DEVELOPERS_ROOM_WELCOME,
}

const WechatyEnglishRoomInviter = RoomInviter(wechatyEnglishConfig)

export {
  WechatyEnglishRoomInviter,
}
