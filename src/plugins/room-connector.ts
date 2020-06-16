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

  MIKE_BO_CONTACT_ID,
}                           from '../id-config'

const getSenderRoomDisplayName = async (message: Message) => {
  const from = message.from()!
  const room = message.room()

  const alias = await room?.alias(from)
  return alias || from.name() || 'Noname'
}

function getRoomShortNameByRegexp (matcher: RegExp) {
  return async function getRoomShortName (message: Message): Promise<undefined | string> {
    const room = message.room()
    if (!room) {
      return
    }

    const topic = await room.topic()
    const matched = topic.match(matcher)

    if (!matched) {
      return
    }

    return matched[1]
  }
}

const getRoomShortName = getRoomShortNameByRegexp(/\s*([^\s]*\s*[^\s]+)$/)

/**
 *
 * Message Mapper for Room Connectors
 *
 */
const unidirectionalMapper: RoomConnectorMessageMapFunction = async (message: Message) => {
  // Forward all non-Text messages
  if (message.type() !== Message.Type.Text) { return message }

  const talkerDisplayName = await getSenderRoomDisplayName(message)
  const roomShortName     = await getRoomShortName(message) || 'Nowhere'

  const text = message.text()

  return `[${talkerDisplayName}@${roomShortName}]: ${text}`
}

const bidirectionalMessageMapper: RoomConnectorMessageMapFunction = async (message: Message) => {
  // Drop all messages if not Text
  if (message.type() !== Message.Type.Text) { return }

  const talkerDisplayName = await getSenderRoomDisplayName(message)
  const roomShortName     = await getRoomShortName(message) || 'Nowhere'

  const text = message.text()

  return `[${talkerDisplayName}@${roomShortName}]: ${text}`
}

/**
 *
 * OneToMany
 *
 */
const OneToManyPlugin = OneToManyRoomConnector({
  blacklist: [
    MIKE_BO_CONTACT_ID,
  ],
  many: [
    ...DEVELOPERS_ROOM_ID_LIST,
  ],
  map: unidirectionalMapper,
  one: HEADQUARTERS_ROOM_ID,
})

/**
 *
 * Many to One
 *
 */
const ManyToOnePlugin = ManyToOneRoomConnector({
  blacklist: [
    MIKE_BO_CONTACT_ID,
  ],
  many: [
    ...DEVELOPERS_ROOM_ID_LIST,
  ],
  map: unidirectionalMapper,
  one: HEADQUARTERS_ROOM_ID,
})

/**
 *
 * Many to Many
 *
 */
const blacklist = [
  async (message: Message) => message.type() !== Message.Type.Text,
  MIKE_BO_CONTACT_ID,
]

const ManyToManyPlugin = ManyToManyRoomConnector({
  blacklist,
  many: [
    ...DEVELOPERS_ROOM_ID_LIST,
  ],
  map: bidirectionalMessageMapper,
})

/**
 *
 * BOT5 Club
 *
 */
const Bot5OneToManyPlugin = OneToManyRoomConnector({
  many: [
    BOT5_CLUB_2019_ROOM_ID,
  ],
  map: unidirectionalMapper,
  one: BOT5_CLUB_2020_ROOM_ID,
})

export {
  OneToManyPlugin,
  ManyToOnePlugin,
  ManyToManyPlugin,
  Bot5OneToManyPlugin,
}
