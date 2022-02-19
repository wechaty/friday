/* eslint-disable sort-keys */
import {
  Module,
  Provider,
}             from '@nestjs/common'

import { SagaHandlers }     from './sagas/mod.js'
import { CountingService }  from './counting.service.js'

const providers: Provider[] = [
  ...SagaHandlers,
  CountingService,
]

@Module({
  providers,
  exports: [],
})
export class StatuspageModule {}
