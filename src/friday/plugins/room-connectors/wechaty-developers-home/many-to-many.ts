import { Message } from 'wechaty'
import {
  ManyToManyRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  // DEVELOPERS_ROOM_ID_LIST,
  MIKE_CONTACT_ID,
}                             from '../../../../database'
import {
  wechatyDevelopersHome,
}                             from '../../../../database/mod'

import { bidirectionalMapper }            from '../bidirectional-mapper'

/**
 *
 * Many to Many
 *
 */
const blacklist = [
  async (message: Message) => message.type() !== Message.Type.Text,
  MIKE_CONTACT_ID,
]

const ManyToManyPlugin = ManyToManyRoomConnector({
  blacklist,
  many: [
    ...wechatyDevelopersHome.home, // DEVELOPERS_ROOM_ID_LIST,
  ],
  map: bidirectionalMapper,
})

export {
  ManyToManyPlugin,
}
