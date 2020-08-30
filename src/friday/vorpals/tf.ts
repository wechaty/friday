import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'

import { Chitchat } from '../../tf/chitchat'

const tfConfig: WechatyVorpalConfig = {
  contact : true,
  mention : true,
  room    : true,
  silent  : true,

  use  : [
    Chitchat(),
  ],
}
const TfVorpalPlugin = WechatyVorpal(tfConfig)

export {
  TfVorpalPlugin,
}
