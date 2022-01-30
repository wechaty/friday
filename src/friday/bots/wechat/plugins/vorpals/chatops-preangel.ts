import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  UrlLink,
}                         from 'wechaty-vorpal-contrib'

import { fridayConfig } from '../../../../config/deprecated.js'

const config: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : fridayConfig.wechat.chatops.preangel,
  silent  : true,

  use: [
    UrlLink(),
  ],
}
const PreAngelVorpalPlugin = WechatyVorpal(config)

export {
  PreAngelVorpalPlugin,
}
