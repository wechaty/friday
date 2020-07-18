import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  UrlLink,
}                         from 'wechaty-vorpal-contrib'

import {
  PREANGEL_CHATOPS_ROOM_ID,
}                         from '../database'

const config: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : PREANGEL_CHATOPS_ROOM_ID,
  silent  : true,

  use: [
    UrlLink(),
  ],
}
const PreAngelVorpalPlugin = WechatyVorpal(config)

export {
  PreAngelVorpalPlugin,
}
