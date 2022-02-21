import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  Ding,
  Eval,
  Cash,
  UrlLink,
  Announce,
  Find,
  MathMaster,
  Version,
  Whoru,
}                         from 'wechaty-vorpal-contrib'
import type { WxWorkSettings } from '../../../../settings/mod'

const getChatopsVorpalPlugin = (settings: WxWorkSettings) => {
  const chatopsConfig: WechatyVorpalConfig = {
    contact : false,
    mention : false,
    room    : settings.chatOpsRoomId,
    silent  : true,

    use: [
      Ding(),
      Eval(),
      Cash(),
      UrlLink(),
      Announce(),
      Find(),
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
