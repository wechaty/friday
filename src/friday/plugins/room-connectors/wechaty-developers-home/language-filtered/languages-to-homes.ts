import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  MIKE_CONTACT_ID,
}                             from '../../../../../database.js'
import {
  wechatyDevelopers,
}                             from '../../../../../database/mod.js'

import { bidirectionalMapper } from '../../bidirectional-mapper.js'

const LanguageToHomePlugin = SourceToTargetRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  map: bidirectionalMapper,
  source: [
    ...wechatyDevelopers.chinese,
    ...wechatyDevelopers.english,
  ],
  target: [
    ...wechatyDevelopers.home,
    ...wechatyDevelopers.homeHq,
  ],
})

export {
  LanguageToHomePlugin,
}
