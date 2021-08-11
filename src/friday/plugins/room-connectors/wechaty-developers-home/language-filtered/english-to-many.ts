import {
  OneToManyRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  // DEVELOPERS_ROOM_ID_LIST,
  MIKE_CONTACT_ID,
  // DEVELOPERS_ROOM_ID_WXWORK,
  // DEVELOPERS_ROOM_ID_ENGLISH,
}                             from '../../../../../database'

import {
  wechatyDevelopersHome,
}                             from '../../../../../database/mod'

import { bidirectionalMapper } from '../../bidirectional-mapper'

/**
 *
 * OneToMany
 *
 */
const EnglishToManyPlugin = OneToManyRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  many: [
    ...wechatyDevelopersHome.home,  // DEVELOPERS_ROOM_ID_LIST,
    ...wechatyDevelopersHome.monitor, // DEVELOPERS_ROOM_ID_WXWORK,
  ],
  map: bidirectionalMapper,
  /**
   * Huan(202108):
   *  OneToMany should be merged to ManyToOne
   *  as AtoB to support array
   */
  one: wechatyDevelopersHome.english[0], // DEVELOPERS_ROOM_ID_ENGLISH,
})

export {
  EnglishToManyPlugin,
}
