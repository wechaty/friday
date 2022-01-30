/* eslint-disable sort-keys */
import { Module } from '@nestjs/common'

import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from './commands/handlers/index.js'
import { EventHandlers } from './events/handlers/index.js'
import { QueryHandlers } from './queries/handlers/index.js'

import { BotsSagas } from './sagas/bots.sagas.js'

import { HeroesGameController } from './friday.controller.js'
import { BotRepository } from './repository/bot.repository.js'

import { FridayConfig } from './config/mod.js'

@Module({
  imports: [CqrsModule],
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
