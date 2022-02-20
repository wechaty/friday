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
import type { WxWorkSettings } from '../../../../wechaty-settings/mod'

const getChatopsVorpalPlugin = (settings: WxWorkSettings) => {
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
