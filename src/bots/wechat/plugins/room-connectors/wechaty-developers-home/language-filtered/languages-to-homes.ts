import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  botSettings,
  MIKE_CONTACT_ID,
}                   from '../../../../../../bot-settings/deprecated.js'

import { bidirectionalMapper } from '../../bidirectional-mapper.js'

const LanguageToHomePlugin = SourceToTargetRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  map: bidirectionalMapper,
  source: [
    ...botSettings.weChat.rooms.wechatyDevelopers.chinese,
    ...botSettings.weChat.rooms.wechatyDevelopers.english,
  ],
  target: [
    ...botSettings.weChat.rooms.wechatyDevelopers.home,
    ...botSettings.weChat.rooms.wechatyDevelopers.homeHq,
  ],
})

export {
  LanguageToHomePlugin,
}
