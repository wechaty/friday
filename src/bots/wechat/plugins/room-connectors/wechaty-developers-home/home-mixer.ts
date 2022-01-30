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
}                             from '../../../../../setting/legacy/database.js'
import { fridaySetting } from '../../../../../setting/deprecated.js'

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
    ...fridaySetting.wechat.wechatyDevelopers.home,
  ],
  map: bidirectionalMapper,
})

export {
  ManyToManyPlugin,
}
