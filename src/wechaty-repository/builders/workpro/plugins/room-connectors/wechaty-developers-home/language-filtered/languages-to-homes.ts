import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import type { WorkProSettings } from '../../../../../../../wechaty-settings/mod.js'

import { bidirectionalMapper } from '../../bidirectional-mapper.js'

const getLanguageToHomePlugin = (settings: WorkProSettings) => {
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
