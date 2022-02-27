import type { Message } from 'wechaty'
import { log } from 'wechaty-puppet'

const senderDisplayName = async (message: Message) => {
  const room = message.room()

  let displayName
  try {
    const talker = message.talker()
    const alias  = await room?.alias(talker)
    displayName =  alias || talker.name() || 'Noname'
  } catch (e) {
    log.error('senderDisplayName', 'message.talker() exception: %s', (e as Error).message)
    displayName = 'unknown'
  }

  return displayName
}

export { senderDisplayName }
