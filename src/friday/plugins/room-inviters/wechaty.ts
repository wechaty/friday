import {
  RoomInviter,
  RoomInviterConfig,
}                       from 'wechaty-plugin-contrib'

import {
  wechatyDevelopersHome,
}                             from '../../../database/mod'

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
  room: wechatyDevelopersHome.home,
  rule: WECHATY_DEVELOPERS_ROOM_RULES,
  welcome: WECHATY_DEVELOPERS_ROOM_WELCOME,
}

const WechatyRoomInviter = RoomInviter(wechatyConfig)

export {
  WechatyRoomInviter,
}
