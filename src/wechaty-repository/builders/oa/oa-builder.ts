import { Injectable } from '@nestjs/common'
import {
  WechatyBuilder,
}             from 'wechaty'
import { Brolog } from 'brolog'

import { PuppetOA }  from 'wechaty-puppet-official-account'

import type * as WECHATY from 'wechaty'

import { OaSettings } from '../../../wechaty-settings/mod.js'

import { getPlugins } from './plugins/mod.js'

@Injectable()
class OABuilder implements WECHATY.BuilderInterface {

  private name            : string
  private appId           : string
  private appSecret       : string
  private token           : string
  private webhookProxyUrl : string

  disabled: boolean

  constructor (
    private readonly log: Brolog,
    settings: OaSettings,
  ) {
    this.log.verbose('OABuilder', 'constructor({name: %s, webhookProxyUrl: %s}) %s',
      settings.name,
      settings.webhookProxyUrl,
      settings.disabled ? 'DISABLED' : '',
    )

    this.disabled        = settings.disabled
    this.appId           = settings.appId
    this.appSecret       = settings.appSecret
    this.name            = settings.name
    this.token           = settings.token
    this.webhookProxyUrl = settings.webhookProxyUrl
  }

  build () {
    this.log.verbose('OABuilder', 'build()')

    const puppet = new PuppetOA({
      appId           : this.appId,
      appSecret       : this.appSecret,
      token           : this.token,
      webhookProxyUrl : this.webhookProxyUrl,
    })

    const wechaty = WechatyBuilder.build({
      name: this.name,
      puppet,
    })

    wechaty.use(getPlugins())

    return wechaty
  }

}

export {
  OABuilder,
}
