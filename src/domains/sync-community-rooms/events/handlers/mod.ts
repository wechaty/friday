import { GitterCommunityMessageReceivedHandler }    from './gitter-community-message-received.handler.js'
import { PuppetMessageReceivedHandler }             from './puppet-message-received.handler.js'
import { QqCommunityMessageReceivedHandler }        from './qq-community-message-received.handler.js'
import { WeChatCommunityMessageReceivedHandler }    from './wechat-community-message-received.handler.js'
import { WhatsAppCommunityMessageReceivedHandler }  from './whatsapp-community-message-received.handler.js'

export const EventHandlers = [
  GitterCommunityMessageReceivedHandler,
  PuppetMessageReceivedHandler,
  QqCommunityMessageReceivedHandler,
  WeChatCommunityMessageReceivedHandler,
  WhatsAppCommunityMessageReceivedHandler,
]
