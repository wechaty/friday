import {
  ManyToOneRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  HEADQUARTERS_ROOM_ID,
  DEVELOPERS_ROOM_ID_LIST,
  MIKE_CONTACT_ID,
  DEVELOPERS_ROOM_ID_WXWORK,
  DEVELOPERS_ROOM_ID_CHINESE,
  DEVELOPERS_ROOM_ID_ENGLISH,
}                             from '../../../../database'

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
    ...DEVELOPERS_ROOM_ID_LIST,
    DEVELOPERS_ROOM_ID_CHINESE,
    DEVELOPERS_ROOM_ID_ENGLISH,
    DEVELOPERS_ROOM_ID_WXWORK,
  ],
  map: unidirectionalMapper,
  one: HEADQUARTERS_ROOM_ID,
})

export {
  ManyToOnePlugin,
}
