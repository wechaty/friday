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
import type { WeChatSettings } from '../../../../wechaty-settings/mod'

const getContributorsVorpalPlugin = (settings: WeChatSettings) => {
  const contributorsConfig: WechatyVorpalConfig = {
    contact : false,
    mention : true,
    room    : settings.rooms.wechatyDevelopers.contributors, // CONTRIBUTORS_ROOM_ID,
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
  return ContributorsVorpalPlugin
}

export {
  getContributorsVorpalPlugin,
}
