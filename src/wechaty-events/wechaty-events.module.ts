/* eslint-disable sort-keys */
import {
  Module,
}                 from '@nestjs/common'

import { CommandHandlers }  from './commands/mod.js'
import { EventHandlers } from './events/mod.js'

@Module({
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
  ],
  exports: [
    // ...CommandHandlers,
  ],
})
export class WechatyEventsModule {}
