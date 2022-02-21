/* eslint-disable sort-keys */
import {
  Module,
}             from '@nestjs/common'

import { WechatySettingsModule } from '../wechaty-settings/mod.js'

import { WechatyBuilders }    from './builders/mod.js'

import { WechatyRepository }  from './wechaty.repository.js'

@Module({
  imports: [
    WechatySettingsModule,
  ],
  providers: [
    WechatyRepository,
    ...WechatyBuilders,
  ],
  exports: [
    WechatyRepository,
  ],
})
export class WechatyRepositoryModule {}
