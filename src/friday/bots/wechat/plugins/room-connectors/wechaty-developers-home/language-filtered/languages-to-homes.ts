import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  MIKE_CONTACT_ID,
}                             from '../../../../../../config/legacy/database.js'
import { fridayConfig } from '../../../../deprecated.js'

import { bidirectionalMapper } from '../../bidirectional-mapper.js'

const LanguageToHomePlugin = SourceToTargetRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  map: bidirectionalMapper,
  source: [
    ...fridayConfig.wechat.wechatyDevelopers.chinese,
    ...fridayConfig.wechat.wechatyDevelopers.english,
  ],
  target: [
    ...fridayConfig.wechat.wechatyDevelopers.home,
    ...fridayConfig.wechat.wechatyDevelopers.homeHq,
  ],
})

export {
  LanguageToHomePlugin,
}
