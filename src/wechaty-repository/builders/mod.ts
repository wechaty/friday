import { GitterBuilder }    from './gitter/gitter-builder.js'
import { OABuilder }        from './oa/oa-builder.js'
import { QqBuilder }        from './qq/qq-builder.js'
import { WeChatBuilder }    from './wechat/wechat-builder.js'
import { WhatsAppBuilder }  from './whatsapp/whatsapp-builder.js'
import { WXWorkBuilder }    from './wxwork/wxwork-builder.js'

const WechatyBuilders = [
  GitterBuilder,
  OABuilder,
  QqBuilder,
  WeChatBuilder,
  WhatsAppBuilder,
  WXWorkBuilder,
]

export {
  WechatyBuilders,
  GitterBuilder,
  OABuilder,
  QqBuilder,
  WeChatBuilder,
  WhatsAppBuilder,
  WXWorkBuilder,
}
