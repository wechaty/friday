import { ForwardMessageToGitterCommunityHandler }       from './forward-message-to-gitter-community.handler.js'
import { ForwardTextMessageToGitterCommunityHandler }   from './forward-text-message-to-gitter-community.handler.js'
import { ForwardMessageToQqCommunityHandler }           from './forward-message-to-qq-community.handler.js'
import { ForwardTextMessageToQqCommunityHandler }       from './forward-text-message-to-qq-community.handler.js'
import { ForwardMessageToWeChatCommunityHandler }       from './forward-message-to-wechat-community.handler.js'
import { ForwardMessageToWorkProCommunityHandler }      from './forward-message-to-workpro-community.handler.js'
import { ForwardTextMessageToWeChatCommunityHandler }   from './forward-text-message-to-wechat-community.handler.js'
import { ForwardTextMessageToWorkProCommunityHandler }  from './forward-text-message-to-workpro-community.handler.js'
import { ForwardMessageToWhatsAppCommunityHandler }     from './forward-message-to-whatsapp-community.handler.js'
import { ForwardTextMessageToWhatsAppCommunityHandler } from './forward-text-message-to-whatsapp-community.handler.js'

const CommandHandlers = [
  ForwardMessageToGitterCommunityHandler,
  ForwardTextMessageToGitterCommunityHandler,
  ForwardMessageToQqCommunityHandler,
  ForwardTextMessageToQqCommunityHandler,
  ForwardMessageToWeChatCommunityHandler,
  ForwardMessageToWorkProCommunityHandler,
  ForwardTextMessageToWeChatCommunityHandler,
  ForwardTextMessageToWorkProCommunityHandler,
  ForwardMessageToWhatsAppCommunityHandler,
  ForwardTextMessageToWhatsAppCommunityHandler,
]

export {
  CommandHandlers,
}
