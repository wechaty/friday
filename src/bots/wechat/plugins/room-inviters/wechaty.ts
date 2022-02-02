import {
  RoomInviter,
  RoomInviterConfig,
}                       from 'wechaty-plugin-contrib'

import { fridaySetting } from '../../../../settings/deprecated.js'

import {
  repeat,
  WECHATY_DEVELOPERS_ROOM_RULES,
  WECHATY_DEVELOPERS_ROOM_WELCOME,
}                                       from './config.js'

const wechatyConfig: RoomInviterConfig = {
  password : [
    /^wechaty$/i,
    /^plugin$/i,
  ],
  repeat,
  room: fridaySetting.wechat.wechatyDevelopers.home,
  rule: WECHATY_DEVELOPERS_ROOM_RULES,
  welcome: WECHATY_DEVELOPERS_ROOM_WELCOME,
}

const WechatyRoomInviter = RoomInviter(wechatyConfig)

export {
  WechatyRoomInviter,
}
