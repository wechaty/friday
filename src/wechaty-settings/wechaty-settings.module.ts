/* eslint-disable sort-keys */
import {
  Module,
}             from '@nestjs/common'

import { WechatySettings } from './settings/mod.js'

import { EnvVar } from './env-var.js'

@Module({
  providers: [
    ...WechatySettings,
    EnvVar,
  ],
  exports: [
    ...WechatySettings,
  ],
})
export class WechatySettingsModule {}
