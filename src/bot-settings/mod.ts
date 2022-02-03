import { OicqSettings } from './oicq/mod.js'
import { GitterSettings } from './gitter/mod.js'
import { WhatsAppSettings } from './whatsapp/mod.js'
import { OaSettings } from './oa/mod.js'
import { WxWorkSettings } from './wxwork/mod.js'
import { WeChatSettings } from './wechat/mod.js'

const settings = [
  OicqSettings,
  GitterSettings,
  WhatsAppSettings,
  OaSettings,
  WxWorkSettings,
  WeChatSettings,
]

export {
  settings,

  OicqSettings,
  GitterSettings,
  WhatsAppSettings,
  OaSettings,
  WxWorkSettings,
  WeChatSettings,
}
