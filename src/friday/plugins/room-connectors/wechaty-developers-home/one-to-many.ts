import {
  OneToManyRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  HEADQUARTERS_ROOM_ID,
  DEVELOPERS_ROOM_ID_LIST,
  MIKE_CONTACT_ID,
  DEVELOPERS_ROOM_ID_WXWORK,
}                             from '../../../../database'

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
    ...DEVELOPERS_ROOM_ID_LIST,
    DEVELOPERS_ROOM_ID_WXWORK,
  ],
  map: unidirectionalMapper,
  one: HEADQUARTERS_ROOM_ID,
})

export {
  OneToManyPlugin,
}
