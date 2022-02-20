import { Module }     from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { WechatyBotsModule }  from '../wechaty-repository/mod.js'

import { CommandHandlers }  from './commands/mod.js'
import { EventHandlers }    from './events/mod.js'
import { QueryHandlers }    from './queries/mod.js'
// import { SagaHandlers }     from './sagas/mod.js'

@Module({
  imports: [
    CqrsModule,
    WechatyBotsModule,
  ],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    // ...SagaHandlers,
  ],
  // eslint-disable-next-line sort-keys
  exports: [],
})
export class SyncCommunityRoomsModule {}
