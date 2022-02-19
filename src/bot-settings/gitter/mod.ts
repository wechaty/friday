import * as envVar from 'env-var'
import type { Logger } from 'brolog'

import type { NamedInterface } from '../named-interface.js'
import { Injectable } from '@nestjs/common'

@Injectable()
class GitterSettings implements NamedInterface {

  readonly name = 'Gitter'

  constructor (
    private readonly log: Logger,

    public readonly wechatyRoomId = '573324fcc43b8c60197242bf', // 'https://gitter.im/wechaty/wechaty'

    public readonly token = envVar
      .get('WECHATY_PUPPET_GITTER_TOKEN')
      .required(true)
      .asString(),
  ) {
    this.log.verbose('GitterSettings', 'constructor(%s) token=%s, wechatyRoomId=%s', this.name, token, wechatyRoomId)
  }

}

export {
  GitterSettings,
}
