import { Room } from 'wechaty'
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

import {
  WXWORK_FRIDAY_ROOM_ID,
}                                 from '../../../database'

const isNotChatOpsRoom = (room: Room) => !([
  WXWORK_FRIDAY_ROOM_ID,
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
