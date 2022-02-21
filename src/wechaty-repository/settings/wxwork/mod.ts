import type { Logger } from 'brolog'
import { Injectable } from '@nestjs/common'

import { EnvVar } from '../../env-var.js'
import type { NamedInterface } from '../named-interface.js'

@Injectable()
class WxWorkSettings implements NamedInterface {

  readonly name = 'WXWork'
  readonly heartbeatRoomId = 'R:10696051718181051'  // ChatOps - Heartbeat 💖
  readonly chatOpsRoomId   = 'R:10696051757179651'  // 'R:3057039320'  // ChatOps - WXWork

  readonly token: string

  constructor (
    private readonly log: Logger,
    envVar: EnvVar,
  ) {
    this.token = envVar
      .get('WECHATY_PUPPET_SERVICE_TOKEN_WXWORK')
      .required(true)
      .asString()

    this.log.verbose('WxWorkSettings', 'constructor(%s) token=%s chatOpsRoomId=%s', this.name, this.token, this.chatOpsRoomId)
  }

}

export {
  WxWorkSettings,
}
