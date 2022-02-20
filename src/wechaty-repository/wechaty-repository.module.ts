/* eslint-disable sort-keys */
import {
  Module,
}             from '@nestjs/common'

import { WechatySettingsModule } from '../wechaty-settings/wechaty-settings.module.js'

import { GitterBuilder }    from './gitter/gitter-builder.js'
import { OABuilder }        from './oa/oa-builder.js'
import { QqBuilder }        from './qq/qq-builder.js'
import { WeChatBuilder }    from './wechat/wechat-builder.js'
import { WhatsAppBuilder }  from './whatsapp/whatsapp-builder.js'
import { WXWorkBuilder }    from './wxwork/wxwork-builder.js'

import { WechatyRepository } from './wechaty.repository.js'

@Module({
  imports: [
    WechatySettingsModule,
  ],
  providers: [
    GitterBuilder,
    OABuilder,
    QqBuilder,
    WeChatBuilder,
    WhatsAppBuilder,
    WXWorkBuilder,
  ],
  exports: [
    WechatyRepository,
  ],
})
export class WechatyRepositoryModule {}
