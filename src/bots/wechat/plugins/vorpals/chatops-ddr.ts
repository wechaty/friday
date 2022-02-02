import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  Ddr,
}                         from 'wechaty-vorpal-contrib'

import { fridaySetting } from '../../../../settings/deprecated.js'

const donutConfig: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : [
    fridaySetting.wechat.chatops.ddr,
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
