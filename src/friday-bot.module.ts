/* eslint-disable sort-keys */
import { Module }     from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import * as CQRS from './friday-controller/mod.js'

import { FridayController }   from './friday-controller/mod.js'

@Module({
  imports: [
    CqrsModule,
  ],
  controllers: [FridayController],
  providers: [
    ...CQRS.commands.CommandHandlers,
  ],
  exports: [],
})
export class FridayBotModule {}
