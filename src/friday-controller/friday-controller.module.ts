/* eslint-disable sort-keys */
import {
  Module,
}                 from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { InfrastructureModule } from '../infrastructure/infrastructure.module.js'

import { WechatyEventsModule } from '../wechaty-events/mod.js'
import { WechatyRepositoryModule } from '../wechaty-repository/mod.js'
import { WechatySettingsModule } from '../wechaty-settings/wechaty-settings.module.js'

import { CommandHandlers }  from './commands/mod.js'
import { FridayController } from './friday.controller.js'

@Module({
  imports: [
    CqrsModule,
    InfrastructureModule,
    WechatyEventsModule,
    WechatySettingsModule,
    WechatyRepositoryModule,
  ],
  providers: [
    ...CommandHandlers,
  ],
  controllers: [FridayController],
})
export class FridayControllerModule {}
