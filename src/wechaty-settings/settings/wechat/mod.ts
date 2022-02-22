import { Brolog } from 'brolog'
import { Injectable } from '@nestjs/common'

import type { NamedInterface }  from '../../named-interface.js'
import { EnvVar }               from '../../../infrastructure/mod.js'

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

  readonly wechatyPuppet: string
  readonly wechatyPuppetToken: string
  readonly wechatyPuppetEndpoint?: string

  readonly wechatyToken: string
  readonly wechatyPuppetServerPort: number

  readonly disabled: boolean

  constructor (
    readonly log: Brolog,
    readonly envVar: EnvVar,
  ) {
    this.disabled = envVar
      .get('WECHATY_DISABLE_WECHAT')
      .default(0)
      .asBool()

    this.wechatyPuppet = envVar
      .get('WECHATY_PUPPET')
      .required(true)
      .asString()

    this.wechatyPuppetToken = envVar
      .get('WECHATY_PUPPET_SERVICE_TOKEN')
      .required(true)
      .asString()

    this.wechatyPuppetEndpoint = envVar
      .get('WECHATY_PUPPET_ENDPOINT')
      .asString()

    this.wechatyToken = envVar
      .get('WECHATY_TOKEN')
      .required()
      .asString()

    this.wechatyPuppetServerPort = envVar
      .get('WECHATY_PUPPET_SERVER_PORT')
      .default(0)
      .asPortNumber()

    this.log.verbose('WeChatSettings', 'constructor() %s%s: wechatyToken=%s wechatyPuppetServiceToken=%s',
      this.disabled ? 'DISABLED ' : '',
      this.name,
      this.wechatyToken,
      this.wechatyPuppetToken,
    )
  }

}

export {
  WeChatSettings,
}
