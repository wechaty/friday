import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  Ddr,
}                         from 'wechaty-vorpal-contrib'

import { fridayConfig } from '../../../../config/deprecated.js'

const donutConfig: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : [
    fridayConfig.wechat.chatops.ddr,
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
