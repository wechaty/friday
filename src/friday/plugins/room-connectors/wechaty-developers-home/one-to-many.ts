import {
  OneToManyRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  // HEADQUARTERS_ROOM_ID,
  // DEVELOPERS_ROOM_ID_LIST,
  MIKE_CONTACT_ID,
  // DEVELOPERS_ROOM_ID_WXWORK,
}                             from '../../../../database'
import {
  wechatyDevelopersHome,
}                             from '../../../../database/mod'

import { unidirectionalMapper }           from '../unidirectional-mapper'

/**
 *
 * OneToMany
 *
 */
const OneToManyPlugin = OneToManyRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  many: [
    ...wechatyDevelopersHome.home, // DEVELOPERS_ROOM_ID_LIST,
    ...wechatyDevelopersHome.monitor, // DEVELOPERS_ROOM_ID_WXWORK,
  ],
  map: unidirectionalMapper,
  one: wechatyDevelopersHome.headquarters[0], // HEADQUARTERS_ROOM_ID,
})

export {
  OneToManyPlugin,
}
