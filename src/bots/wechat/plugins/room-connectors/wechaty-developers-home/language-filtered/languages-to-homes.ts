import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  weChatSettings,
  MIKE_CONTACT_ID,
}                   from '../../../../../../settings/deprecated.js'

import { bidirectionalMapper } from '../../bidirectional-mapper.js'

const LanguageToHomePlugin = SourceToTargetRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  map: bidirectionalMapper,
  source: [
    ...weChatSettings.rooms.wechatyDevelopers.chinese,
    ...weChatSettings.rooms.wechatyDevelopers.english,
  ],
  target: [
    ...weChatSettings.rooms.wechatyDevelopers.home,
    ...weChatSettings.rooms.wechatyDevelopers.homeHq,
  ],
})

export {
  LanguageToHomePlugin,
}
