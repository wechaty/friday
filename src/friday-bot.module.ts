/* eslint-disable sort-keys */
import { Module }     from '@nestjs/common'

import { DomainModelModules }       from './domain-models/mod.js'
import { FridayControllerModule }   from './friday-controller/mod.js'
import { InfrastructureModule }     from './infrastructure/mod.js'
import { WechatyEventsModule }      from './wechaty-events/mod.js'
import { WechatyRepositoryModule }  from './wechaty-repository/mod.js'

@Module({
  imports: [
    FridayControllerModule,
    InfrastructureModule,
    WechatyEventsModule,
    WechatyRepositoryModule,
    ...DomainModelModules,
  ],
})
export class FridayBotModule {}
