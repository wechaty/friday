/* eslint-disable sort-keys */
import {
  Module,
}             from '@nestjs/common'

import { EnvVar } from './env-var.js'

import { QqSettings }       from './qq/mod.js'
import { GitterSettings }   from './gitter/mod.js'
import { WhatsAppSettings } from './whatsapp/mod.js'
import { OaSettings }       from './oa/mod.js'
import { WxWorkSettings }   from './wxwork/mod.js'
import { WeChatSettings }   from './wechat/mod.js'

const settings = [
  QqSettings,
  GitterSettings,
  WhatsAppSettings,
  OaSettings,
  WxWorkSettings,
  WeChatSettings,
]

@Module({
  providers: [
    ...settings,
    EnvVar,
  ],
  exports: [
    ...settings,
  ],
})
export class WechatySettingsModule {}
