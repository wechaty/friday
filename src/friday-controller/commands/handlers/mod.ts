import { SendMessageHandler } from './send-message.handler.js'
import { ChatopsHandler } from '../../events/mod.js'

export const CommandHandlers = [
  SendMessageHandler,
  ChatopsHandler,
]
