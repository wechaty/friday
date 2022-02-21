/* eslint-disable sort-keys */
import { Module }     from '@nestjs/common'
import { Brolog }     from 'brolog'

@Module({
  providers: [
    Brolog,
  ],
  exports: [
    Brolog,
  ],
})
export class InfrastructureModule {}
