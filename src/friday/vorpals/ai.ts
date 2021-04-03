import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'

import { Chitchat }     from '../../ml/chitchat'
import { Gpt }          from '../../ml/gpt'
import { Dreamily }     from '../../ml/dreamily'

const aiConfig: WechatyVorpalConfig = {
  contact : true,
  mention : true,
  room    : true,
  silent  : true,

  use  : [
    Chitchat(),
    Gpt(),
    Dreamily(),
  ],
}
const AiVorpalPlugin = WechatyVorpal(aiConfig)

export {
  AiVorpalPlugin,
}
