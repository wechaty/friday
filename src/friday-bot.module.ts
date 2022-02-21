/* eslint-disable sort-keys */
import { Module }     from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'

import { FridayControllerModule }   from './friday-controller/mod.js'
import { WechatyRepositoryModule }  from './wechaty-repository/mod.js'

import {
  StatuspageModule,
  SyncCommunityRoomsModule,
}                                 from './domain-models/mod.js'

@Module({
  imports: [
    CqrsModule,
    FridayControllerModule,
    StatuspageModule,
    SyncCommunityRoomsModule,
  ],
  providers: [
  ],
  exports: [],
})
export class FridayBotModule {}
