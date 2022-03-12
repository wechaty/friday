/* eslint-disable sort-keys */
import {
  Module,
}                     from '@nestjs/common'
import {
  CqrsModule,
}                     from '@nestjs/cqrs'

import { InfrastructureModule }   from '../infrastructures/infrastructure.module.js'
import { WechatySettingsModule }  from '../wechaty-settings/mod.js'

import { WechatyBuilders }    from './builders/mod.js'

import { WechatyRepository }  from './wechaty.repository.js'

@Module({
  imports: [
    CqrsModule,
    InfrastructureModule,
    WechatySettingsModule,
  ],
  providers: [
    WechatyRepository,
    ...WechatyBuilders,
  ],
  exports: [
    WechatyRepository,
  ],
})
export class WechatyRepositoryModule {}
