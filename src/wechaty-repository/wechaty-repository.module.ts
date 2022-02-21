/* eslint-disable sort-keys */
import {
  Module,
}             from '@nestjs/common'

import { WechatyBuilders }    from './builders/mod.js'
import { WechatySettings }    from './settings/mod.js'

import { WechatyRepository }  from './wechaty.repository.js'

@Module({
  providers: [
    WechatyRepository,
    ...WechatyBuilders,
    ...WechatySettings,
  ],
  exports: [
    WechatyRepository,
    ...WechatySettings,
  ],
})
export class WechatyRepositoryModule {}
