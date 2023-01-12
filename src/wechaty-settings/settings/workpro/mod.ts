import { Brolog } from 'brolog'
import { Injectable } from '@nestjs/common'

import { EnvVar }               from '../../../infrastructures/mod.js'
import type { NamedInterface }  from '../../named-interface.js'

import * as polyglotUserGroup   from './rooms/polyglot-user-group.js'
import * as puppetUserGroup     from './rooms/puppet-user-group.js'
import * as wechatyDevelopers   from './rooms/wechaty-developers.js'
import * as bot5Club            from './rooms/bot5.js'
import * as chatops             from './rooms/chatops.js'

@Injectable()
class WorkProSettings implements NamedInterface {

  readonly name = 'WorkPro'
  readonly heartbeatRoomId = 'R:10696051718181051'  // ChatOps - Heartbeat 💖
  readonly chatOpsRoomId   = 'R:10696051718181051'  // ChatOps - Heartbeat 💖

  // To-be-updated
  readonly mikeId = 'wxid_a8d806dzznm822'   // Mike BO

  readonly token: string

  readonly rooms = {
    bot5Club,
    chatops,
    polyglotUserGroup,
    puppetUserGroup,
    wechatyDevelopers,
  } as const

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
