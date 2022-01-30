import {
  Message,
  types,
}             from 'wechaty'

import { fridayConfig } from '../../../../config/deprecated.js'

import { abbrRoomTopicForAll } from './abbr-room-topic-by-regex.js'
import { senderDisplayName }              from './sender-display-name.js'

const skipRoomList = [
  ...fridayConfig.wechat.wechatyDevelopers.homeHq,
  ...fridayConfig.wechat.wechatyDevelopers.broadcastStation,
]
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
    case types.Message.Text:
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
        if (room && !skipRoomList.includes(room.id)) {
          const msgType = types.Message[message.type()]
          messageList.unshift(`${prefix}: ${msgType}`)
        }
      }
      break
  }

  return messageList
}

export { unidirectionalMapper }
