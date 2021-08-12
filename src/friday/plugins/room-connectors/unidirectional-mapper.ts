import { Message }  from 'wechaty'
// import {
//   mappers,
// }                   from 'wechaty-plugin-contrib'

// import {
//   HEADQUARTERS_ROOM_ID,
// }                           from '../../../database'
import {
  wechatyDevelopers,
}                           from '../../../database/mod'

import { abbrRoomTopicForAll } from './abbr-room-topic-by-regex'
import { senderDisplayName }              from './sender-display-name'

/**
 *
 * Message Mapper for Room Connectors
 *
 */
const unidirectionalMapper = async (message: Message) => {
  const talkerDisplayName = await senderDisplayName(message)
  const roomShortName     = await abbrRoomTopicForAll(message) || 'Nowhere'

  const prefix = `[${talkerDisplayName}@${roomShortName}]`

  const messageList: (string | Message)[] = []

  switch (message.type()) {
    case Message.Type.Text:
      messageList.push(`${prefix}: ${message.text()}`)
      break

    default:  // Forward all non-Text messages
      messageList.push(message)
      {
        const room = message.room()
        /**
         * If message is not sent from Headquarters Room,
         * then we add a sender information for the destination rooms.
         */
        if (room && !wechatyDevelopers.headquarters.includes(room.id)) {
          const type = Message.Type[message.type()]
          messageList.unshift(`${prefix}: ${type}`)
        }
      }
      break
  }

  return messageList
}

export { unidirectionalMapper }
