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

import { fridaySetting } from '../../../../settings/deprecated.js'

const chatopsConfig: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : fridaySetting.wechat.chatops.bot5,
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
