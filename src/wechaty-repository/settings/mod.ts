import { QqSettings }       from './qq/mod.js'
import { GitterSettings }   from './gitter/mod.js'
import { WhatsAppSettings } from './whatsapp/mod.js'
import { OaSettings }       from './oa/mod.js'
import { WxWorkSettings }   from './wxwork/mod.js'
import { WeChatSettings }   from './wechat/mod.js'

const WechatySettings = [
  QqSettings,
  GitterSettings,
  WhatsAppSettings,
  OaSettings,
  WxWorkSettings,
  WeChatSettings,
]

export {
  WechatySettings,

  QqSettings,
  GitterSettings,
  WhatsAppSettings,
  OaSettings,
  WxWorkSettings,
  WeChatSettings,
}
