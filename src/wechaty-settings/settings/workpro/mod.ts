import { Brolog } from 'brolog'
import { Injectable } from '@nestjs/common'

import { EnvVar }               from '../../../infrastructures/mod.js'
import type { NamedInterface }  from '../../named-interface.js'

@Injectable()
class WorkProSettings implements NamedInterface {

  readonly name = 'WorkPro'
  readonly heartbeatRoomId = 'R:10696051718181051'  // ChatOps - Heartbeat 💖
  readonly chatOpsRoomId   = 'R:10696051757179651'  // 'R:3057039320'  // ChatOps - WorkPro

  readonly token: string

  constructor (
    private readonly log: Brolog,
    envVar: EnvVar,
  ) {
    this.token = envVar
      .get('WECHATY_PUPPET_SERVICE_TOKEN_WORKPRO')
      .required(true)
      .asString()

    this.log.verbose('WorkProSettings', 'constructor() %s: token=%s chatOpsRoomId=%s',
      this.name,
      this.token,
      this.chatOpsRoomId,
    )
  }

}

export {
  WorkProSettings,
}
