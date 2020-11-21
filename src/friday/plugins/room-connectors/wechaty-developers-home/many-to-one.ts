import {
  ManyToOneRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  HEADQUARTERS_ROOM_ID,
  DEVELOPERS_ROOM_ID_LIST,
  MIKE_CONTACT_ID,
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
  ],
  map: unidirectionalMapper,
  one: HEADQUARTERS_ROOM_ID,
})

export {
  ManyToOnePlugin,
}
