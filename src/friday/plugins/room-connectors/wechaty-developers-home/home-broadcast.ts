import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  MIKE_CONTACT_ID,
}                             from '../../../../database'
import {
  wechatyDevelopers,
}                             from '../../../../database/mod'

import { unidirectionalMapper }           from '../unidirectional-mapper'

/**
 *
 * Many to One
 *
 */
const ManyToOnePlugin = SourceToTargetRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  map: unidirectionalMapper,
  source: [
    ...wechatyDevelopers.home,
    ...wechatyDevelopers.chinese,
    ...wechatyDevelopers.english,
  ],
  target: [
    ...wechatyDevelopers.headquarters,
  ],
})

export {
  ManyToOnePlugin,
}
