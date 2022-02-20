import * as envVar from 'env-var'
import type { Logger } from 'brolog'
import { Injectable } from '@nestjs/common'

import type { NamedInterface } from '../named-interface.js'

@Injectable()
class WxWorkSettings implements NamedInterface {

  readonly name = 'WXWork'

  constructor (
    private readonly log: Logger,

    public readonly token = envVar
      .get('WECHATY_PUPPET_SERVICE_TOKEN_WXWORK')
      .required(true)
      .asString(),

    public readonly heartbeatRoomId = 'R:10696051718181051',  // ChatOps - Heartbeat 💖
    public readonly chatOpsRoomId   = 'R:10696051757179651',  // 'R:3057039320'  // ChatOps - WXWork

  ) {
    this.log.verbose('WxWorkSettings', 'constructor(%s) token=%s chatOpsRoomId=%s', this.name, token, chatOpsRoomId)
  }

}

export {
  WxWorkSettings,
}
