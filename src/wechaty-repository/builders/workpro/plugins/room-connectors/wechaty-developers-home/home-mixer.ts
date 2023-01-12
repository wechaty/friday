import {
  Message,
  types,
}             from 'wechaty'
import {
  ManyToManyRoomConnector,
}                                     from 'wechaty-plugin-contrib'

import type { WorkProSettings } from '../../../../../../wechaty-settings/mod.js'

import { bidirectionalMapper }            from '../bidirectional-mapper.js'

/**
 *
 * Many to Many
 *
 */
const getManyToManyPlugin = (settings: WorkProSettings) => {
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
