import { Module }     from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { InfrastructureModule }     from '../../infrastructure/mod.js'
import { WechatyRepositoryModule }  from '../../wechaty-repository/mod.js'
import { WechatySettingsModule }    from '../../wechaty-settings/mod.js'

import { CommandHandlers }  from './commands/mod.js'
import { EventHandlers }    from './events/mod.js'
import { QueryHandlers }    from './queries/mod.js'
// import { SagaHandlers }     from './sagas/mod.js'

@Module({
  imports: [
    CqrsModule,
    WechatySettingsModule,
    InfrastructureModule,
    WechatyRepositoryModule,
  ],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    // ...SagaHandlers,
  ],
})
export class SyncCommunityRoomsModule {}
