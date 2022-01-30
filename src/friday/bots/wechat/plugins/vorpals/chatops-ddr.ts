import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  Ddr,
}                         from 'wechaty-vorpal-contrib'

import {
  DDR_ROOM_ID,
  MIXED_DDR_ROOM_ID,
  // DDR2_CHATOPS_ROOM_WXWORK_ID,
}                         from '../../../config/legacy/database.js'

const donutConfig: WechatyVorpalConfig = {
  contact : false,
  mention : false,
  room    : [
    DDR_ROOM_ID,
    MIXED_DDR_ROOM_ID,
    // DDR2_CHATOPS_ROOM_WXWORK_ID,
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
