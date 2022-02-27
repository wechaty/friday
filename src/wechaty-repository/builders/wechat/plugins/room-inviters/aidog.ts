import {
  RoomInviter,
  RoomInviterConfig,
}                       from 'wechaty-plugin-contrib'
import type { WeChatSettings } from '../../../../../wechaty-settings/mod.js'

import { repeat } from './config.js'

const getAidogRoomInviter = (_: WeChatSettings) => {
  const aidogConfig: RoomInviterConfig = {
    password: [
      /^aidog$/i,
    ],
    repeat,
    room: /^Youth fed the 5th dog$/i,
    welcome: '禁止在本群测试机器人。 注意：老群已满，此群为AiDog第五个新群',
  }

  const AidogRoomInviter = RoomInviter(aidogConfig)
  return AidogRoomInviter
}

export {
  getAidogRoomInviter,
}
