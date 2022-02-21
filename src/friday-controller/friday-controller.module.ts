/* eslint-disable sort-keys */
import {
  Module,
}                 from '@nestjs/common'

import { CommandHandlers }  from './commands/mod.js'
import { FridayController } from './friday.controller.js'

@Module({
  providers: [
    ...CommandHandlers,
  ],
  controllers: [FridayController],
  exports: [
    ...CommandHandlers,
  ],
})
export class FridayControllerModule {

  constructor () {}

}
