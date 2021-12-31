import {
  Message,
  types,
}             from 'wechaty'
import {
  ManyToManyRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  // DEVELOPERS_ROOM_ID_LIST,
  MIKE_CONTACT_ID,
}                             from '../../../../database.js'
import {
  wechatyDevelopers,
}                             from '../../../../database/mod.js'

import { bidirectionalMapper }            from '../bidirectional-mapper.js'

/**
 *
 * Many to Many
 *
 */
const blacklist = [
  async (message: Message) => message.type() !== types.Message.Text,
  MIKE_CONTACT_ID,
]

const ManyToManyPlugin = ManyToManyRoomConnector({
  blacklist,
  many: [
    ...wechatyDevelopers.home,
  ],
  map: bidirectionalMapper,
})

export {
  ManyToManyPlugin,
}
