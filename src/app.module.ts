import { Module } from '@nestjs/common'
import { FridayModule } from './friday.module.js'

@Module({
  imports: [
    FridayModule,
  ],
  providers: [],
})
export class ApplicationModule {

  constructor () {}

}
