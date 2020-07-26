import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  Ddr,
}                         from 'wechaty-vorpal-contrib'

import {
  DDR_CHATOPS_ROOM_ID,
}                         from '../database'

const donutConfig: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : DDR_CHATOPS_ROOM_ID,
  silent  : true,

  use  : [
    Ddr(),
  ],
}
const DdrVorpalPlugin = WechatyVorpal(donutConfig)

export {
  DdrVorpalPlugin,
}
