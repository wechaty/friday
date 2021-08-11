import {
  OneToManyRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  // DEVELOPERS_ROOM_ID_LIST,
  MIKE_CONTACT_ID,
  // DEVELOPERS_ROOM_ID_WXWORK,
  // DEVELOPERS_ROOM_ID_CHINESE,
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
const ChineseToManyPlugin = OneToManyRoomConnector({
  blacklist: [
    MIKE_CONTACT_ID,
  ],
  many: [
    ...wechatyDevelopersHome.home, // DEVELOPERS_ROOM_ID_LIST,
    ...wechatyDevelopersHome.monitor, // DEVELOPERS_ROOM_ID_WXWORK,
  ],
  map: bidirectionalMapper,
  /**
   * Huan(202108):
   *  oneToMany and manyToOne seems can be merged to one:
   *    AToB
   *  so it can upport many As to many Bs
   */
  one: wechatyDevelopersHome.chinese[0], // DEVELOPERS_ROOM_ID_CHINESE,
})

export {
  ChineseToManyPlugin,
}
