import * as envVar from 'env-var'
import type { Brolog } from 'brolog'
import { Injectable } from '@nestjs/common'

import type { NamedInterface } from '../named-interface.js'

@Injectable()
class OicqSettings implements NamedInterface {

  constructor (
    protected log: Brolog,

    public qq = envVar
      .get('WECHATY_PUPPET_OICQ_QQ')
      .required(true)
      .asIntPositive(),

    public name = 'friday@qq',

    public wechatyRoomId = 'group_696864249', // Wechaty Developers' Home QQ

  ) {
    this.log.verbose('OicqSettings', 'constructor(%s) qq=%s, wechatyRoomId=%s', this.name, qq, wechatyRoomId)
  }

}

export {
  OicqSettings,
}
