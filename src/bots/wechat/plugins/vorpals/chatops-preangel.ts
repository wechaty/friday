import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  UrlLink,
}                         from 'wechaty-vorpal-contrib'

import { fridaySetting } from '../../../../settings/deprecated.js'

const config: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : fridaySetting.wechat.chatops.preangel,
  silent  : true,

  use: [
    UrlLink(),
  ],
}
const PreAngelVorpalPlugin = WechatyVorpal(config)

export {
  PreAngelVorpalPlugin,
}
