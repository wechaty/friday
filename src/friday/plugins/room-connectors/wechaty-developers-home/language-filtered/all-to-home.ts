import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  MIKE_CONTACT_ID,
}                             from '../../../../../database'
import {
  wechatyDevelopers,
}                             from '../../../../../database/mod'

import { bidirectionalMapper } from '../../bidirectional-mapper'

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
    ...wechatyDevelopers.home, // DEVELOPERS_ROOM_ID_LIST,
  ],
})

export {
  LanguageToHomePlugin,
}
