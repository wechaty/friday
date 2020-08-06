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

import {
  WXWORK_FRIDAY_ROOM_ID,
}                                       from '../../../database'

const chatopsConfig: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : WXWORK_FRIDAY_ROOM_ID,
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

export {
  ChatopsVorpalPlugin,
}
