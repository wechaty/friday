/* eslint-disable sort-keys */
import { Module }     from '@nestjs/common'
import { Brolog }     from 'brolog'

import { EnvVar }     from './env-var.js'

@Module({
  providers: [
    Brolog,
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
