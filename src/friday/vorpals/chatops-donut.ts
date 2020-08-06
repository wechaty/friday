import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  Ddr,
}                         from 'wechaty-vorpal-contrib'

import {
  DONUT_ROOM_ID,
}                         from '../../database'

const donutConfig: WechatyVorpalConfig = {
  contact : false,
  mention : true,
  room    : DONUT_ROOM_ID,
  silent  : true,

  use  : [
    Ddr(),
  ],
}
const DonutVorpalPlugin         = WechatyVorpal(donutConfig)

export {
  DonutVorpalPlugin,
}
