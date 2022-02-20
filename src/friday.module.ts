/* eslint-disable sort-keys */
import { Module }     from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { ScheduleModule } from '@nestjs/schedule'

import * as CQRS from './cqrs/mod.js'

import { WechatyBotsModule }  from './wechaty-repository/mod.js'
import { settings }           from './wechaty-settings/mod.js'

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
    ...CQRS.commands.CommandHandlers,
  ],
  exports: [],
})
export class FridayModule {}
