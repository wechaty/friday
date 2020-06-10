import { Message } from 'wechaty'
import {
  OneToManyRoomConnector,
  ManyToOneRoomConnector,
  ManyToManyRoomConnector,
  RoomConnectorMessageMapFunction,
}                                     from 'wechaty-plugin-contrib'

import {
  HEADQUARTERS_ROOM_ID,
  DEVELOPERS_ROOM_ID_LIST,

  BOT5_CLUB_2019_ROOM_ID,
  BOT5_CLUB_2020_ROOM_ID,
}                           from '../rooms-config'

const blacklist = [ async () => true ]
const whitelist = [ async (message: Message) => message.type() === Message.Type.Text ]

const getSenderRoomDisplayName = async (message: Message) => {
  const from = message.from()!
  const room = message.room()

  const alias = await room?.alias(from)
  return alias || from.name() || 'Noname'
}

const OneToManyPlugin = OneToManyRoomConnector({
  // blacklist,
  many: [
    ...DEVELOPERS_ROOM_ID_LIST,
  ],
  // map: async message => `[${message.from()?.name()}@HQ]: ${message.text()}`,
  one: HEADQUARTERS_ROOM_ID,
  // whitelist,
})

const manyToOneMap: RoomConnectorMessageMapFunction = async (message: Message) => {
  if (message.type() !== Message.Type.Text) { return message }

  const displayName = await getSenderRoomDisplayName(message)
  const text        = message.text()

  let homeName = 'Nowhere'
  const topic = await message.room()?.topic() || 'Nowhere'
  const regex = /Developers'\s*(.+)/i
  const match = topic.match(regex)
  if (match) {
    homeName = match[1]
  }

  return `[${displayName}@${homeName}]: ${text}`
}

/**
 *
 * Many to One
 *
 */
const ManyToOnePlugin = ManyToOneRoomConnector({
  // blacklist,
  many: [
    ...DEVELOPERS_ROOM_ID_LIST,
  ],
  map: manyToOneMap,
  one: HEADQUARTERS_ROOM_ID,
  // whitelist,
})

const manyToManyMap: RoomConnectorMessageMapFunction = async (message: Message) => {
  if (message.type() !== Message.Type.Text) { return }

  const displayName = await getSenderRoomDisplayName(message)
  const text        = message.text()

  let homeName = 'Nowhere'
  const topic = await message.room()?.topic() || 'Nowhere'
  const regex = /Developers'\s*(.+)/i
  const match = topic.match(regex)
  if (match) {
    homeName = match[1]
  }

  return `[${displayName}@${homeName}]: ${text}`
}

/**
 *
 * Many to Many
 *
 */
const ManyToManyPlugin = ManyToManyRoomConnector({
  blacklist,
  many: [
    ...DEVELOPERS_ROOM_ID_LIST,
  ],
  map: manyToManyMap,
  whitelist,
})

/**
 *
 * BOT5 Club
 *
 */
const Bot5OneToManyPlugin = OneToManyRoomConnector({
  blacklist,
  many: [
    BOT5_CLUB_2019_ROOM_ID,
  ],
  map: async message => `[${message.from()?.name()}@2020]: ${message.text()}`,
  one: BOT5_CLUB_2020_ROOM_ID,
  whitelist,
})

export {
  OneToManyPlugin,
  ManyToOnePlugin,
  ManyToManyPlugin,
  Bot5OneToManyPlugin,
}
