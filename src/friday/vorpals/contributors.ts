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

// import {
//   CONTRIBUTORS_ROOM_ID,
// }                         from '../../database'
import {
  wechatyDevelopers,
}                         from '../../database/mod'

const contributorsConfig: WechatyVorpalConfig = {
  contact : false,
  mention : true,
  room    : wechatyDevelopers.contributors, // CONTRIBUTORS_ROOM_ID,
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
