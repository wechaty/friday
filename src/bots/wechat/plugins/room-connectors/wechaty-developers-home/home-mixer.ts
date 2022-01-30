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
}                             from '../../../../../config/legacy/database.js'
import { fridayConfig } from '../../../../../config/deprecated.js'

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
    ...fridayConfig.wechat.wechatyDevelopers.home,
  ],
  map: bidirectionalMapper,
})

export {
  ManyToManyPlugin,
}
