import {
  SourceToTargetRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  // HEADQUARTERS_ROOM_ID,
  // DEVELOPERS_ROOM_ID_LIST,
  MIKE_CONTACT_ID,
  // DEVELOPERS_ROOM_ID_WXWORK,
}                             from '../../../../database'
import {
  polyglotWechatyUserGroup,
  wechatyDevelopers,
}                             from '../../../../database/mod'

import { unidirectionalMapper }           from '../unidirectional-mapper'

/**
 *
 * OneToMany
 *
 */
const OneToManyPlugin = SourceToTargetRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  map: unidirectionalMapper,
  source: [
    ...wechatyDevelopers.headquarters, // HEADQUARTERS_ROOM_ID,
  ],
  target: [
    ...wechatyDevelopers.home,
    ...wechatyDevelopers.monitor,
    ...Object.values(polyglotWechatyUserGroup).flat(),
  ],
})

export {
  OneToManyPlugin,
}
