import { GetGitterMembersCountHandler }   from './get-gitter-members-count.handler.js'
import { GetQqMembersCountHandler }       from './get-qq-members-count.handler.js'
import { GetWeChatMembersCountHandler }   from './get-wechat-members-count.handler.js'
import { GetWorkProMembersCountHandler }  from './get-workpro-members-count.handler.js'
import { GetWhatsAppMembersCountHandler } from './get-whatsapp-members-count.handler.js'

export const QueryHandlers = [
  GetGitterMembersCountHandler,
  GetQqMembersCountHandler,
  GetWeChatMembersCountHandler,
  GetWorkProMembersCountHandler,
  GetWhatsAppMembersCountHandler,
]
