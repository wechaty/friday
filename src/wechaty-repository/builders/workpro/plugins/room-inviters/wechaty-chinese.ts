import {
  RoomInviter,
  RoomInviterConfig,
}                       from 'wechaty-plugin-contrib'
import type { WorkProSettings } from '../../../../../wechaty-settings/mod.js'

import {
  repeat,
  WECHATY_DEVELOPERS_ROOM_RULES_CHINESE,
}                                         from './config.js'

const getWechatyChineseRoomInviter = (settings: WorkProSettings) => {
  const wechatyChineseConfig: RoomInviterConfig = {
    password : [
      /^wechaty chinese$/i,
      /^wechaty 中文$/i,
      /^中文$/i,
    ],
    repeat,
    room: settings.rooms.wechatyDevelopers.chinese, // DEVELOPERS_ROOM_ID_CHINESE,
    rule: WECHATY_DEVELOPERS_ROOM_RULES_CHINESE,
    welcome: [
      '，欢迎你加入 Wechaty 中文开发者微信群！请发送一个简短的自我介绍向群友们做个介绍，谢谢！',
    ],
  }

  const WechatyChineseRoomInviter = RoomInviter(wechatyChineseConfig)
  return WechatyChineseRoomInviter
}

export {
  getWechatyChineseRoomInviter,
}
