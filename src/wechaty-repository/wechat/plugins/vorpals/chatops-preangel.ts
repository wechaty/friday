import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  UrlLink,
}                         from 'wechaty-vorpal-contrib'

import { botSettings } from '../../../../wechaty-settings/deprecated.js'

const config: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : botSettings.weChat.rooms.chatops.preangel,
  silent  : true,

  use: [
    UrlLink(),
  ],
}
const PreAngelVorpalPlugin = WechatyVorpal(config)

export {
  PreAngelVorpalPlugin,
}
