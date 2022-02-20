import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  Ddr,
}                         from 'wechaty-vorpal-contrib'
import type { WeChatSettings } from '../../../../wechaty-settings/mod'

const getDdrVorpalPlugin = (settings: WeChatSettings) => {
  const donutConfig: WechatyVorpalConfig = {
    contact : false,
    mention : false,
    room    : [
      settings.rooms.chatops.ddr,
    ],
    silent  : true,

    use  : [
      Ddr(),
    ],
  }
  const DdrVorpalPlugin = WechatyVorpal(donutConfig)
  return DdrVorpalPlugin
}

export {
  getDdrVorpalPlugin,
}
