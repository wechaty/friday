import { QqSettings }       from './qq/mod.js'
import { GitterSettings }   from './gitter/mod.js'
import { WhatsAppSettings } from './whatsapp/mod.js'
import { OaSettings }       from './oa/mod.js'
import { WxWorkSettings }   from './wxwork/mod.js'
import { WeChatSettings }   from './wechat/mod.js'

import type { BotName } from './named-interface.js'

import { EnvVar }           from './env-var.js'
import {
  WechatySettingsModule,
}                           from './wechaty-settings.module.js'

export {
  type BotName,
  WechatySettingsModule,
  EnvVar,

  QqSettings,
  GitterSettings,
  WhatsAppSettings,
  OaSettings,
  WxWorkSettings,
  WeChatSettings,
}
