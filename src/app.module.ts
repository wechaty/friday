import { Module } from '@nestjs/common'

import { FridayModule } from './friday/mod.js'

@Module({
  imports: [
    FridayModule,
  ],
  providers: [],
})
export class ApplicationModule {

  constructor () {}

}
