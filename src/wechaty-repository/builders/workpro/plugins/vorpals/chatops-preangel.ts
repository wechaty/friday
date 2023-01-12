import {
  WechatyVorpal,
  WechatyVorpalConfig,
}                         from 'wechaty-vorpal'
import {
  UrlLink,
}                         from 'wechaty-vorpal-contrib'
import type { WorkProSettings } from '../../../../../wechaty-settings/mod.js'

const getPreAngelVorpalPlugin = (settings: WorkProSettings) => {
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
