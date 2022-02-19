import * as envVar from 'env-var'
import type { Logger } from 'brolog'
import { Injectable } from '@nestjs/common'

import type { NamedInterface } from '../named-interface.js'

import * as wechatyUserGroup    from './polyglot-wechaty-user-group.js'
import * as wechatyDevelopers   from './wechaty-developers.js'
import * as bot5Club            from './bot5.js'
import * as chatops             from './chatops.js'

@Injectable()
class WeChatSettings implements NamedInterface {

  readonly name = 'WeChat'

  constructor (
    private readonly log: Logger,

    public readonly token = envVar
      .get('WECHATY_PUPPET_SERVICE_TOKEN')
      .required(true)
      .asString(),

    public readonly rooms = {
      bot5Club,
      chatops,
      wechatyDevelopers,
      wechatyUserGroup,
    } as const,

  ) {
    this.log.verbose('WeChatSettings', 'constructor(%s) token=%s', this.name, token)
  }

}

export {
  WeChatSettings,
}
