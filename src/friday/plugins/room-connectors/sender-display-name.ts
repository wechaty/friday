import { Message } from 'wechaty'

const senderDisplayName = async (message: Message) => {
  const from = message.from()!
  const room = message.room()

  const alias = await room?.alias(from)
  return alias || from.name() || 'Noname'
}

export { senderDisplayName }
