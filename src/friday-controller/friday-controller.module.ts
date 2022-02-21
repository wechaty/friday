/* eslint-disable sort-keys */
import {
  Module,
}                 from '@nestjs/common'

import { WechatyEventsModule } from '../wechaty-events/mod.js'
import { WechatyRepositoryModule } from '../wechaty-repository/mod.js'

// import { CommandHandlers }  from './commands/mod.js'
import { FridayController } from './friday.controller.js'

@Module({
  imports: [
    WechatyEventsModule,
    WechatyRepositoryModule,
  ],
  // providers: [
  //   ...CommandHandlers,
  // ],
  controllers: [FridayController],
})
export class FridayControllerModule {}
