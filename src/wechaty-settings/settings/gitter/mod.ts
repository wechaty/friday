import {
  Injectable,
}               from '@nestjs/common'
import { Brolog } from 'brolog'

import { EnvVar }               from '../../env-var.js'
import type { NamedInterface }  from '../../named-interface.js'

@Injectable()
class GitterSettings implements NamedInterface {

  readonly name = 'Gitter'
  readonly wechatyRoomId = '573324fcc43b8c60197242bf' // 'https://gitter.im/wechaty/wechaty'

  readonly token: string

  constructor (
    private readonly log: Brolog,
    envVar: EnvVar,
  ) {
    this.token = envVar
      .get('WECHATY_PUPPET_GITTER_TOKEN')
      .required(true)
      .asString()

    this.log.verbose('GitterSettings', 'constructor(%s) token=%s, wechatyRoomId=%s',
      this.name,
      this.token,
      this.wechatyRoomId,
    )
  }

}

export {
  GitterSettings,
}
