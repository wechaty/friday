import {
  ManyToOneRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  // HEADQUARTERS_ROOM_ID,
  // DEVELOPERS_ROOM_ID_LIST,
  MIKE_CONTACT_ID,
  // DEVELOPERS_ROOM_ID_WXWORK,
  // DEVELOPERS_ROOM_ID_CHINESE,
  // DEVELOPERS_ROOM_ID_ENGLISH,
}                             from '../../../../database'
import {
  wechatyDevelopersHome,
}                             from '../../../../database/mod'

import { unidirectionalMapper }           from '../unidirectional-mapper'

/**
 *
 * Many to One
 *
 */
const ManyToOnePlugin = ManyToOneRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  many: [
    ...wechatyDevelopersHome.home, // DEVELOPERS_ROOM_ID_LIST,
    ...wechatyDevelopersHome.chinese, // DEVELOPERS_ROOM_ID_CHINESE,
    ...wechatyDevelopersHome.english, // DEVELOPERS_ROOM_ID_ENGLISH,
    ...wechatyDevelopersHome.monitor, // DEVELOPERS_ROOM_ID_WXWORK,
  ],
  map: unidirectionalMapper,
  one: wechatyDevelopersHome.headquarters[0], // HEADQUARTERS_ROOM_ID,
})

export {
  ManyToOnePlugin,
}
