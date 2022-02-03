import { GetGitterMembersCountHandler }   from './get-gitter-members-count.handler.js'
import { GetOicqMembersCountHandler }     from './get-oicq-members-count.handler.js'
import { GetWeChatMembersCountHandler }   from './get-wechat-members-count.handler.js'
import { GetWhatsAppMembersCountHandler } from './get-whatsapp-members-count.handler.js'

export const QueryHandlers = [
  GetGitterMembersCountHandler,
  GetOicqMembersCountHandler,
  GetWeChatMembersCountHandler,
  GetWhatsAppMembersCountHandler,
]
