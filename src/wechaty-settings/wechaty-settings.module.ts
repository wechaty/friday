/* eslint-disable sort-keys */
import {
  Module,
}             from '@nestjs/common'

import { InfrastructureModule } from '../infrastructure/mod.js'

import { WechatySettings }  from './settings/mod.js'
import { EnvVar }           from './env-var.js'

@Module({
  imports: [
    InfrastructureModule,
  ],
  providers: [
    ...WechatySettings,
    EnvVar,
  ],
  exports: [
    ...WechatySettings,
    EnvVar,
  ],
})
export class WechatySettingsModule {}
