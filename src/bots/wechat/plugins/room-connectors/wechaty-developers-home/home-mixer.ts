import {
  Message,
  types,
}             from 'wechaty'
import {
  ManyToManyRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  weChatSettings,
  MIKE_CONTACT_ID,
}                         from '../../../../../settings/deprecated.js'

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
    ...weChatSettings.rooms.wechatyDevelopers.home,
  ],
  map: bidirectionalMapper,
})

export {
  ManyToManyPlugin,
}
