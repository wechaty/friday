/* eslint-disable sort-keys */
import {
  Module,
}             from '@nestjs/common'

import { WechatySettingsModule } from './settings/wechaty-settings.module.js'

import {
  GitterBuilder,
  OABuilder,
  QqBuilder,
  WeChatBuilder,
  WhatsAppBuilder,
  WXWorkBuilder,
}                   from './builders/mod.js'

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
