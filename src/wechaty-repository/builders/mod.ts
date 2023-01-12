import { GitterBuilder }    from './gitter/gitter-builder.js'
import { OABuilder }        from './oa/oa-builder.js'
import { QqBuilder }        from './qq/qq-builder.js'
import { WeChatBuilder }    from './wechat/wechat-builder.js'
import { WhatsAppBuilder }  from './whatsapp/whatsapp-builder.js'
import { WorkProBuilder }    from './workpro/workpro-builder.js'

const WechatyBuilders = [
  GitterBuilder,
  OABuilder,
  QqBuilder,
  WeChatBuilder,
  WhatsAppBuilder,
  WorkProBuilder,
]

export {
  WechatyBuilders,
  GitterBuilder,
  OABuilder,
  QqBuilder,
  WeChatBuilder,
  WhatsAppBuilder,
  WorkProBuilder,
}
