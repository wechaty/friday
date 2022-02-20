import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import type { WeChatSettings } from '../../../../../../wechaty-settings/mod.js'

import { bidirectionalMapper } from '../../bidirectional-mapper.js'

const getLanguageToHomePlugin = (settings: WeChatSettings) => {
  const LanguageToHomePlugin = SourceToTargetRoomConnector({
    blacklist: [
      settings.mikeId,
    ],
    map: bidirectionalMapper,
    source: [
      ...settings.rooms.wechatyDevelopers.chinese,
      ...settings.rooms.wechatyDevelopers.english,
    ],
    target: [
      ...settings.rooms.wechatyDevelopers.home,
      ...settings.rooms.wechatyDevelopers.homeHq,
    ],
  })
  return LanguageToHomePlugin
}

export {
  getLanguageToHomePlugin,
}
