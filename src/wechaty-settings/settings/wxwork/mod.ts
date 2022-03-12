import { Brolog } from 'brolog'
import { Injectable } from '@nestjs/common'

import { EnvVar }               from '../../../infrastructures/mod.js'
import type { NamedInterface }  from '../../named-interface.js'

@Injectable()
class WxWorkSettings implements NamedInterface {

  readonly name = 'WXWork'
  readonly heartbeatRoomId = 'R:10696051718181051'  // ChatOps - Heartbeat 💖
  readonly chatOpsRoomId   = 'R:10696051757179651'  // 'R:3057039320'  // ChatOps - WXWork

  readonly token: string
  readonly disabled: boolean

  constructor (
    private readonly log: Brolog,
    envVar: EnvVar,
  ) {
    this.disabled = envVar
      .get('WECHATY_DISABLE_WXWORK')
      .default(0)
      .asBool()

    this.token = envVar
      .get('WECHATY_PUPPET_SERVICE_TOKEN_WXWORK')
      .required(true)
      .asString()

    this.log.verbose('WxWorkSettings', 'constructor() %s%s: token=%s chatOpsRoomId=%s',
      this.disabled ? 'DISABLED ' : '',
      this.name,
      this.token,
      this.chatOpsRoomId,
    )
  }

}

export {
  WxWorkSettings,
}
