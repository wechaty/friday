/* eslint-disable sort-keys */
import {
  Module,
  Provider,
}             from '@nestjs/common'

import { Sagas } from './sagas/mod.js'
import { CountingService } from './counting-service.js'

const providers: Provider[] = [
  ...Sagas,
  CountingService,
]

@Module({
  providers,
  exports: [],
})
export class StatusModule {}
