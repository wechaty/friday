/* eslint-disable sort-keys */
import { Module }         from '@nestjs/common'
import { CqrsModule }     from '@nestjs/cqrs'
import { ScheduleModule } from '@nestjs/schedule'

import { InfrastructureModule } from '../../infrastructure/mod.js'

import { SagaHandlers }     from './sagas/mod.js'
import { CountingService }  from './counting.service.js'

@Module({
  imports: [
    CqrsModule,
    ScheduleModule.forRoot(),
    InfrastructureModule,
  ],
  providers: [
    ...SagaHandlers,
    CountingService,
  ],
})
export class StatuspageModule {}
