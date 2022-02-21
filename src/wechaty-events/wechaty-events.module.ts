/* eslint-disable sort-keys */
import {
  Module,
}                 from '@nestjs/common'

import { CommandHandlers }  from './commands/mod.js'

@Module({
  providers: [
    ...CommandHandlers,
  ],
  exports: [
    // ...CommandHandlers,
  ],
})
export class WechatyEventsModule {}
