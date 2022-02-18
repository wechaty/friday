import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  UrlLink,
  Find,
  MathMaster,
  Version,
  Whoru,
}                         from 'wechaty-vorpal-contrib'

import { botSettings } from '../../../../bot-settings/deprecated.js'

const contributorsConfig: WechatyVorpalConfig = {
  contact : false,
  mention : true,
  room    : botSettings.weChat.rooms.wechatyDevelopers.contributors, // CONTRIBUTORS_ROOM_ID,
  silent  : true,

  use  : [
    UrlLink(),
    Find(),
    MathMaster(),
    Whoru(),
    Version(),
  ],
}

const ContributorsVorpalPlugin  = WechatyVorpal(contributorsConfig)

export {
  ContributorsVorpalPlugin,
}
