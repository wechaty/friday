/* eslint-disable sort-keys */
import { Module }     from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ScheduleModule } from '@nestjs/schedule'

import * as CQRS from './cqrs/mod.js'

import { WechatyBotsModule }  from './bots/mod.js'
import { settings }           from './bot-settings/mod.js'

import { FridayController }   from './friday.controller.js'

@Module({
  imports: [
    CqrsModule,
    ScheduleModule.forRoot(),
    WechatyBotsModule,
  ],
  controllers: [FridayController],
  providers: [
    ...settings,
    CQRS.sagas.BotsSagas,
    ...CQRS.commands.CommandHandlers,
    ...CQRS.events.EventHandlers,
    ...CQRS.queries.QueryHandlers,
  ],
  exports: [],
})
export class FridayModule {}
