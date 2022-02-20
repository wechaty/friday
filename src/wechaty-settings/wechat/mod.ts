import type { Logger } from 'brolog'
import { Injectable } from '@nestjs/common'

import type { NamedInterface } from '../named-interface.js'
import { EnvVar } from '../env-var.js'

import * as wechatyUserGroup    from './polyglot-wechaty-user-group.js'
import * as wechatyDevelopers   from './wechaty-developers.js'
import * as bot5Club            from './bot5.js'
import * as chatops             from './chatops.js'

@Injectable()
class WeChatSettings implements NamedInterface {

  readonly name = 'WeChat'
  readonly mikeId = 'wxid_a8d806dzznm822'   // Mike BO

  readonly rooms = {
    bot5Club,
    chatops,
    wechatyDevelopers,
    wechatyUserGroup,
  } as const

  readonly token: string

  constructor (
    readonly log: Logger,
    readonly envVar: EnvVar,
  ) {
    this.token = envVar
      .get('WECHATY_PUPPET_SERVICE_TOKEN')
      .required(true)
      .asString()

    this.log.verbose('WeChatSettings', 'constructor(%s) token=%s', this.name, this.token)
  }

}

export {
  WeChatSettings,
}
