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

import type { WeChatSettings } from '../../../../wechaty-settings/mod.js'

const getChatopsVorpalPlugin = (settings: WeChatSettings) => {
  const chatopsConfig: WechatyVorpalConfig = {
    contact : false,
    mention : false,
    room    : settings.rooms.chatops.friday,
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
