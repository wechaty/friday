import { Module } from '@nestjs/common'
import { FridayModule } from './friday.module.js'
import { BotRepository } from './cqrs/repositories/bot.repository.js'

@Module({
  imports: [FridayModule],
  providers: [],
})
export class ApplicationModule {

  constructor (
    public repository: BotRepository,
  ) {
    console.info(repository.findAll())
  }

}
