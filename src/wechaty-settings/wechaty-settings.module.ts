/* eslint-disable sort-keys */
import {
  Module,
}             from '@nestjs/common'

import { InfrastructureModule } from '../infrastructure/mod.js'

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
