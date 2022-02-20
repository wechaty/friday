/* eslint-disable sort-keys */
import {
  Module,
  Provider,
}             from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'

import { SagaHandlers }     from './sagas/mod.js'
import { CountingService }  from './counting.service.js'

const providers: Provider[] = [
  ...SagaHandlers,
  CountingService,
]

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],
  providers,
  exports: [],
})
export class StatuspageModule {}
