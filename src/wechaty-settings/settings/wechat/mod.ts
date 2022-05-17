import { Brolog } from 'brolog'
import { Injectable } from '@nestjs/common'

import type { NamedInterface }  from '../../named-interface.js'
import { EnvVar }               from '../../../infrastructures/mod.js'

import * as polyglotUserGroup   from './rooms/polyglot-user-group.js'
import * as puppetUserGroup     from './rooms/puppet-user-group.js'
import * as wechatyDevelopers   from './rooms/wechaty-developers.js'
import * as bot5Club            from './rooms/bot5.js'
import * as chatops             from './rooms/chatops.js'

@Injectable()
class WeChatSettings implements NamedInterface {

  readonly name = 'WeChat'
  readonly mikeId = 'wxid_a8d806dzznm822'   // Mike BO

  readonly rooms = {
    bot5Club,
    chatops,
    polyglotUserGroup,
    puppetUserGroup,
    wechatyDevelopers,
  } as const

  readonly wechatyPuppet: string
  readonly wechatyPuppetToken: string
  readonly wechatyPuppetEndpoint?: string

  readonly wechatyToken: string

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
      .get('WECHATY_PUPPET_TOKEN')
      .required(true)
      .asString()

    this.wechatyToken = envVar
      .get('WECHATY_TOKEN')
      .required()
      .asString()

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
