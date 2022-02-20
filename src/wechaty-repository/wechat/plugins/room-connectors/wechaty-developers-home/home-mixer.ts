import {
  Message,
  types,
}             from 'wechaty'
import {
  ManyToManyRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import {
  MIKE_CONTACT_ID,
}                         from '../../../../../wechaty-settings/deprecated.js'
import type { WeChatSettings } from '../../../../../wechaty-settings/mod.js'

import { bidirectionalMapper }            from '../bidirectional-mapper.js'

/**
 *
 * Many to Many
 *
 */
const getManyToManyPlugin = (settings: WeChatSettings) => {
  const blacklist = [
    async (message: Message) => message.type() !== types.Message.Text,
    MIKE_CONTACT_ID,
  ]

  const ManyToManyPlugin = ManyToManyRoomConnector({
    blacklist,
    many: [
      ...settings.rooms.wechatyDevelopers.home,
    ],
    map: bidirectionalMapper,
  })
  return ManyToManyPlugin
}

export {
  getManyToManyPlugin,
}
