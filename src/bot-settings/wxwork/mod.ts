import * as envVar from 'env-var'
import type { Brolog } from 'brolog'
import { Injectable } from '@nestjs/common'

import type { NamedInterface } from '../named-interface.js'

@Injectable()
class WxWorkSettings implements NamedInterface {

  constructor (
    protected log: Brolog,

    public token = envVar
      .get('WECHATY_PUPPET_SERVICE_TOKEN_WXWORK')
      .required(true)
      .asString(),

    public name = 'friday@wxwork',

    public heartbeatRoomId = 'R:10696051718181051',  // ChatOps - Heartbeat 💖
    public chatOpsRoomId   = 'R:10696051757179651',  // 'R:3057039320'  // ChatOps - WXWork

  ) {
    this.log.verbose('WxWorkSettings', 'constructor(%s) token=%s chatOpsRoomId=%s', this.name, token, chatOpsRoomId)
  }

}

export {
  WxWorkSettings,
}
