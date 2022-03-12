/* eslint-disable sort-keys */
import {
  Module,
}             from '@nestjs/common'

import { InfrastructureModule } from '../infrastructures/mod.js'

import { WechatySettings }  from './settings/mod.js'

@Module({
  imports: [
    InfrastructureModule,
  ],
  providers: [
    ...WechatySettings,
  ],
  exports: [
    ...WechatySettings,
  ],
})
export class WechatySettingsModule {}
