import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  Ddr,
}                         from 'wechaty-vorpal-contrib'

import { botSettings } from '../../../../bot-settings/deprecated.js'

const donutConfig: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : [
    botSettings.weChat.rooms.chatops.ddr,
  ],
  silent  : true,

  use  : [
    Ddr(),
  ],
}
const DdrVorpalPlugin = WechatyVorpal(donutConfig)

export {
  DdrVorpalPlugin,
}
