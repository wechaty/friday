import { Message }  from 'wechaty'
// import {
//   mappers,
// }                   from 'wechaty-plugin-contrib'

import { abbrRoomTopicForAll } from './abbr-room-topic-by-regex.js'
import { senderDisplayName }   from './sender-display-name.js'

const bidirectionalMapper = async (message: Message) => {
  // Drop all messages if not Text
  if (message.type() !== Message.Type.Text) { return }

  const talkerDisplayName = await senderDisplayName(message)
  const roomShortName     = await abbrRoomTopicForAll(message) || 'Nowhere'

  const text = message.text()

  return `[${talkerDisplayName}@${roomShortName}]: ${text}`
}

export { bidirectionalMapper }
