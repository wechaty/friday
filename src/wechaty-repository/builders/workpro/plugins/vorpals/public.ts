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
import type { WorkProSettings } from '../../../../../wechaty-settings/mod.js'

const getChatopsVorpalPlugin = (settings: WorkProSettings) => {
  const isNotChatOpsRoom = (room: Room) => !([
    settings.chatOpsRoomId,
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
  return ChatopsVorpalPlugin
}

export {
  getChatopsVorpalPlugin,
}
