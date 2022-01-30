/* eslint-disable sort-keys */
import { Module }     from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import * as CQRS from './cqrs/mod.js'

import { WechatyBotsModule }  from './bots/mod.js'

import { FridayController }   from './friday.controller.js'
import { FridaySetting }      from './setting/mod.js'

@Module({
  imports: [
    CqrsModule,
    WechatyBotsModule,
  ],
  controllers: [FridayController],
  providers: [
    FridaySetting,
    CQRS.repositories.BotRepository,
    CQRS.sagas.BotsSagas,
    ...CQRS.commands.CommandHandlers,
    ...CQRS.events.EventHandlers,
    ...CQRS.queries.QueryHandlers,
  ],
  exports: [
    CQRS.repositories.BotRepository,
  ],
})
export class FridayModule {}
