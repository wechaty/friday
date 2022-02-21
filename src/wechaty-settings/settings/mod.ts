import { GitterSettings }   from './gitter/mod.js'
import { OaSettings }       from './oa/mod.js'
import { QqSettings }       from './qq/mod.js'
import { WeChatSettings }   from './wechat/mod.js'
import { WhatsAppSettings } from './whatsapp/mod.js'
import { WxWorkSettings }   from './wxwork/mod.js'

const WechatySettings = [
  GitterSettings,
  OaSettings,
  QqSettings,
  WeChatSettings,
  WhatsAppSettings,
  WxWorkSettings,
]

export {
  WechatySettings,

  GitterSettings,
  OaSettings,
  QqSettings,
  WeChatSettings,
  WhatsAppSettings,
  WxWorkSettings,
}
