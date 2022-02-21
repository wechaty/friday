import {
  Message,
  types,
}             from 'wechaty'
import {
  ManyToManyRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import type { WeChatSettings } from '../../../../../settings/mod.js'

import { bidirectionalMapper }            from '../bidirectional-mapper.js'

/**
 *
 * Many to Many
 *
 */
const getManyToManyPlugin = (settings: WeChatSettings) => {
  const blacklist = [
    async (message: Message) => message.type() !== types.Message.Text,
    settings.mikeId,
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
