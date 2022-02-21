/* eslint-disable sort-keys */
import {
  Module,
}             from '@nestjs/common'
import { WechatyEventsModule } from '../wechaty-events/wechaty-events.module.js'

import { WechatySettingsModule } from '../wechaty-settings/mod.js'

import { WechatyBuilders }    from './builders/mod.js'

import { WechatyRepository }  from './wechaty.repository.js'

@Module({
  imports: [
    WechatyEventsModule,
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
