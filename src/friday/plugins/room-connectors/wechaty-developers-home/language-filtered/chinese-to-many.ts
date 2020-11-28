import {
  OneToManyRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  DEVELOPERS_ROOM_ID_LIST,
  MIKE_CONTACT_ID,
  DEVELOPERS_ROOM_ID_WXWORK,
  DEVELOPERS_ROOM_ID_CHINESE,
}                             from '../../../../../database'

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
    ...DEVELOPERS_ROOM_ID_LIST,
    DEVELOPERS_ROOM_ID_WXWORK,
  ],
  map: bidirectionalMapper,
  one: DEVELOPERS_ROOM_ID_CHINESE,
})

export {
  ChineseToManyPlugin,
}
