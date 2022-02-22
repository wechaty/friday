import {
  Module,
}                 from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { DomainModelModules }       from '../domain-models/mod.js'

import { InfrastructureModule }     from '../infrastructure/mod.js'
import { WechatyEventsModule }      from '../wechaty-events/mod.js'
import { WechatyRepositoryModule }  from '../wechaty-repository/mod.js'
import { WechatySettingsModule }    from '../wechaty-settings/mod.js'

import { CommandHandlers }  from './commands/mod.js'

import { FridayController } from './friday.controller.js'

@Module({
  controllers: [FridayController],
  imports: [
    ...DomainModelModules,
    CqrsModule,
    InfrastructureModule,
    WechatyEventsModule,
    WechatyRepositoryModule,
    WechatySettingsModule,
  ],
  providers: [
    ...CommandHandlers,
  ],
})
export class FridayModule {}
