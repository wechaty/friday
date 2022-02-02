import { Injectable } from '@nestjs/common'
import {
  WechatyBuilder,
}             from 'wechaty'
import { Brolog } from 'brolog'

import { PuppetOA }  from 'wechaty-puppet-official-account'

import type * as WECHATY from 'wechaty'

import type { OaSettings } from '../../settings/mod.js'

import { getPlugins } from './plugins/mod.js'

@Injectable()
class OABuilder implements WECHATY.BuilderInterface {

  protected name            : string
  protected appId           : string
  protected appSecret       : string
  protected token           : string
  protected webhookProxyUrl : string

  constructor (
    protected settings: OaSettings,
    protected log: Brolog,
  ) {
    this.log.verbose('OABuilder', 'constructor({name: %s, webhookProxyUrl: %s})',
      settings.name,
      settings.webhookProxyUrl,
    )

    this.appId           = settings.appId
    this.appSecret       = settings.appSecret
    this.name            = settings.name
    this.token           = settings.token
    this.webhookProxyUrl = settings.webhookProxyUrl
  }

  build () {
    this.log.verbose('OABuilder', 'build()')

    const name = this.name

    const puppet = new PuppetOA({
      appId           : this.appId,
      appSecret       : this.appSecret,
      token           : this.token,
      webhookProxyUrl : this.webhookProxyUrl,
    })

    const wechaty = WechatyBuilder.build({
      name,
      puppet,
    })

    wechaty.use(getPlugins())

    return wechaty
  }

}

export {
  OABuilder,
}
