import type { Room } from 'wechaty'
import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  Ding,
  MathMaster,
  Version,
  Whoru,
}                         from 'wechaty-vorpal-contrib'

import { fridaySetting } from '../../../../setting/deprecated.js'

const isNotChatOpsRoom = (room: Room) => !([
  fridaySetting.wxwork.chatOpsRoomId,
].includes(room.id))

const chatopsConfig: WechatyVorpalConfig = {
  contact : true,
  room    : isNotChatOpsRoom,
  silent  : true,

  use: [
    Ding(),
    MathMaster(),
    Whoru(),
    Version(),
  ],
}

const ChatopsVorpalPlugin = WechatyVorpal(chatopsConfig)

export {
  ChatopsVorpalPlugin,
}
