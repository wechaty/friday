import { Message }  from 'wechaty'
import {
  mappers,
}                   from 'wechaty-plugin-contrib'

import { abbrRoomTopicForDevelopersHome } from './abbr-room-topic-by-regex'
import { senderDisplayName }              from './sender-display-name'

const bidirectionalMapper: mappers.MessageMapperOptions = async (message: Message) => {
  // Drop all messages if not Text
  if (message.type() !== Message.Type.Text) { return }

  const talkerDisplayName = await senderDisplayName(message)
  const roomShortName     = await abbrRoomTopicForDevelopersHome(message) || 'Nowhere'

  const text = message.text()

  return `[${talkerDisplayName}@${roomShortName}]: ${text}`
}

export { bidirectionalMapper }
