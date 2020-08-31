import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'

import { Chitchat } from '../../tf/chitchat'
import { Gpt }      from '../../tf/gpt'

const tfConfig: WechatyVorpalConfig = {
  contact : true,
  mention : true,
  room    : true,
  silent  : true,

  use  : [
    Chitchat(),
    Gpt(),
  ],
}
const TfVorpalPlugin = WechatyVorpal(tfConfig)

export {
  TfVorpalPlugin,
}
