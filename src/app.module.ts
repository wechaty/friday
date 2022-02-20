import { Module } from '@nestjs/common'
import { FridayBotModule } from './friday-bot.module.js'

@Module({
  imports: [
    FridayBotModule,
  ],
  providers: [],
})
export class ApplicationModule {

  constructor () {}

}
