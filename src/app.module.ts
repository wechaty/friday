import { Module } from '@nestjs/common'

import { PresentationModule } from './presentations/mod.js'

@Module({
  imports: [
    PresentationModule,
  ],
})
export class ApplicationModule {

  constructor () {}

}
