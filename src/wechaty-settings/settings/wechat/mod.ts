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

  constructor (
    readonly log: Brolog,
    readonly envVar: EnvVar,
  ) {
    this.wechatyPuppet = envVar
      .get('WECHATY_PUPPET_WECHAT')
      .required(true)
      .asString()

    this.wechatyPuppetToken = envVar
      .get('WECHATY_PUPPET_WECHAT_TOKEN')
      .required(true)
      .asString()

    /**
     * Huan(202301): `wechatyToken` is for re-publish the Wechaty Puppet Service to others
     */
    this.wechatyToken = envVar
      .get('WECHATY_TOKEN')
      .required()
      .asString()

    this.log.verbose('WeChatSettings', 'constructor() %s: wechatyPuppetServiceToken=%s',
      this.name,
      this.wechatyPuppetToken,
    )
  }

}

export {
  WeChatSettings,
}
