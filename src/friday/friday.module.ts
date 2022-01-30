/* eslint-disable sort-keys */
import { Module } from '@nestjs/common'

import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from './commands/mod.js'
import { EventHandlers } from './events/mod.js'
import { QueryHandlers } from './queries/mod.js'

import { WechatyBotsModule } from './bots/mod.js'

import { BotsSagas } from './sagas/bots.sagas.js'

import { HeroesGameController } from './friday.controller.js'
import { BotRepository } from './repository/bot.repository.js'

import { FridayConfig } from './config/mod.js'

@Module({
  imports: [
    CqrsModule,
    WechatyBotsModule,
  ],
  controllers: [HeroesGameController],
  providers: [
    BotRepository,
    FridayConfig,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    BotsSagas,
  ],
  exports: [
    BotRepository,
  ],
})
export class FridayModule {}
