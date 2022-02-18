import { GetMessageSayableHandler }    from './get-message-sayable.handler.js'
import { GetMessageSignatureHandler }  from './get-message-signature.handler.js'
import { IsMessageTypeTextHandler }     from './is-message-type-text.handler.js'

export const QueryHandlers = [
  GetMessageSignatureHandler,
  GetMessageSayableHandler,
  IsMessageTypeTextHandler,
]
