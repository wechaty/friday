import * as envVar from 'env-var'
import type { Brolog } from 'brolog'
import { Injectable } from '@nestjs/common'

import type { NamedInterface } from '../named-interface.js'

@Injectable()
export class QqSettings implements NamedInterface {

  readonly name = 'QQ'

  constructor (
    private readonly log: Logger,

    public readonly qq = envVar
      .get('WECHATY_PUPPET_OICQ_QQ')
      .required(true)
      .asIntPositive(),

    public readonly wechatyRoomId = 'group_696864249', // Wechaty Developers' Home QQ

  ) {
    this.log.verbose('QqSettings', 'constructor(%s) qq=%s, wechatyRoomId=%s', this.name, qq, wechatyRoomId)
  }

}
