import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  UrlLink,
}                         from 'wechaty-vorpal-contrib'
import type { WeChatSettings } from '../../../../wechaty-settings/mod'

const getPreAngelVorpalPlugin = (settings: WeChatSettings) => {
  const config: WechatyVorpalConfig = {
    contact : false,
    mention : false,
    room    : settings.rooms.chatops.preangel,
    silent  : true,

    use: [
      UrlLink(),
    ],
  }
  const PreAngelVorpalPlugin = WechatyVorpal(config)
  return PreAngelVorpalPlugin
}

export {
  getPreAngelVorpalPlugin,
}
