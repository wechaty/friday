/* eslint-disable sort-keys */
import { Module }   from '@nestjs/common'
import { Brolog }   from 'brolog'
import { log }      from 'wechaty'

import { EnvVar }     from './env-var.js'

@Module({
  providers: [
    {
      provide: Brolog,
      useValue: log,
    },
    {
      provide: EnvVar,
      useValue: new EnvVar(),
    },
  ],
  exports: [
    Brolog,
    EnvVar,
  ],
})
export class InfrastructureModule {}
