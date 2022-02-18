import { GetMessageChannelNameHandler } from './get-message-channel-name.handler.js'
import { GetMessageSayableHandler }     from './get-message-sayables.handler.js'
import { GetMessageTalkerNameHandler }  from './get-message-talker-name.handler.js'
import { IsMessageTypeTextHandler }     from './is-message-type-text.handler.js'

export const QueryHandlers = [
  GetMessageChannelNameHandler,
  GetMessageTalkerNameHandler,
  GetMessageSayableHandler,
  IsMessageTypeTextHandler,
]
