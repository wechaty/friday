import {
  RoomInviter,
  RoomInviterConfig,
}                       from 'wechaty-plugin-contrib'

import {
  DEVELOPERS_ROOM_ID_LIST,
}                             from '../../../database'

import {
  repeat,
  WECHATY_DEVELOPERS_ROOM_RULES,
  WECHATY_DEVELOPERS_ROOM_WELCOME,
}                                       from './config'

const wechatyConfig: RoomInviterConfig = {
  password : [
    /^wechaty$/i,
    /^plugin$/i,
  ],
  repeat,
  room: DEVELOPERS_ROOM_ID_LIST,
  rule: WECHATY_DEVELOPERS_ROOM_RULES,
  welcome: WECHATY_DEVELOPERS_ROOM_WELCOME,
}

const WechatyRoomInviter = RoomInviter(wechatyConfig)

export {
  WechatyRoomInviter,
}
