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
  CHATOPS_ROOM_ID,
}                         from '../database'

/*******************************************************
 *
 * ChatOps Room
 *
 */
const chatopsConfig: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : CHATOPS_ROOM_ID,
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

const ChatopsVorpalPlugin       = WechatyVorpal(chatopsConfig)

export {
  ChatopsVorpalPlugin,
}
