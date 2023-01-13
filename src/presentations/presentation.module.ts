import {
  Module,
}                 from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { InfrastructureModule }     from '../infrastructures/mod.js'
import { WechatyEventsModule }      from '../wechaty-events/mod.js'
import { WechatyRepositoryModule }  from '../wechaty-repository/mod.js'
import { WechatySettingsModule }    from '../wechaty-settings/mod.js'

import { CommandHandlers }  from './commands/mod.js'

import { PresentationController } from './presentation.controller.js'

@Module({
  controllers: [ PresentationController ],
  imports: [
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
export class PresentationModule {}
