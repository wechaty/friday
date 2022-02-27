import { Module } from '@nestjs/common'

import { FridayModule } from './friday/mod.js'

@Module({
  imports: [
    FridayModule,
  ],
})
export class ApplicationModule {

  constructor () {}

}
