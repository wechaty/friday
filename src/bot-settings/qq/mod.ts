import * as envVar from 'env-var'
import type { Brolog } from 'brolog'
import { Injectable } from '@nestjs/common'

import type { NamedInterface } from '../named-interface.js'

@Injectable()
export class QqSettings implements NamedInterface {

  constructor (
    protected log: Brolog,

    public qq = envVar
      .get('WECHATY_PUPPET_OICQ_QQ')
      .required(true)
      .asIntPositive(),

    public name = 'QQ',

    public wechatyRoomId = 'group_696864249', // Wechaty Developers' Home QQ

  ) {
    this.log.verbose('QqSettings', 'constructor(%s) qq=%s, wechatyRoomId=%s', this.name, qq, wechatyRoomId)
  }

}
