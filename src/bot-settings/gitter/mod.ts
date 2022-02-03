import * as envVar from 'env-var'
import type { Brolog } from 'brolog'

import type { NamedSetting } from '../named-setting.js'
import { Injectable } from '@nestjs/common'

@Injectable()
class GitterSettings implements NamedSetting {

  constructor (
    protected log: Brolog,

    public name = 'friday@gitter',

    public wechatyRoomId = '573324fcc43b8c60197242bf', // 'https://gitter.im/wechaty/wechaty'

    public token = envVar
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
