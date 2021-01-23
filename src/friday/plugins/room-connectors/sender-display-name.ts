import { Message } from 'wechaty'

const senderDisplayName = async (message: Message) => {
  const talker = message.talker()
  const room = message.room()

  const alias = await room?.alias(talker)
  return alias || talker.name() || 'Noname'
}

export { senderDisplayName }
