import { Module }         from '@nestjs/common'
import { CqrsModule }     from '@nestjs/cqrs'
import { ScheduleModule } from '@nestjs/schedule'

import { InfrastructureModule }     from '../../infrastructures/mod.js'
import { WechatyRepositoryModule }  from '../../wechaty-repository/mod.js'
import { WechatySettingsModule }    from '../../wechaty-settings/mod.js'

import { CommandHandlers }  from './commands/mod.js'
import { EventHandlers }    from './events/mod.js'
import { QueryHandlers }    from './queries/mod.js'
import { SagaHandlers }     from './sagas/mod.js'

import { CountingService }      from './counting.service.js'
import { StatuspageService } from './statuspage.service.js'
import { StatuspageSettings }   from './statuspage.settings.js'

@Module({
  imports: [
    CqrsModule,
    InfrastructureModule,
    ScheduleModule.forRoot(),
    WechatyRepositoryModule,
    WechatySettingsModule,
  ],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ...SagaHandlers,
    CountingService,
    StatuspageService,
    StatuspageSettings,
  ],
})
export class StatuspageModule {}
