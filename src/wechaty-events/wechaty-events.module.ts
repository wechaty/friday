import {
  Module,
}                 from '@nestjs/common'

import { InfrastructureModule }     from '../infrastructure/mod.js'
import { WechatyRepositoryModule }  from '../wechaty-repository/mod.js'

import { CommandHandlers }  from './commands/mod.js'
import { EventHandlers }    from './events/mod.js'

@Module({
  imports: [
    InfrastructureModule,
    WechatyRepositoryModule,
  ],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class WechatyEventsModule {}
