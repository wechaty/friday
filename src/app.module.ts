import { Module } from '@nestjs/common'

import { PresentationModule } from './presentations/mod.js'
import { DomainModules }      from './domains/mod.js'

@Module({
  imports: [
    ...DomainModules,
    PresentationModule,
  ],
})
export class ApplicationModule {

  constructor () {}

}
