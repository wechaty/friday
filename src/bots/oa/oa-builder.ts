import { Injectable } from '@nestjs/common'
import {
  WechatyBuilder,
}             from 'wechaty'
import { Brolog } from 'brolog'

import { PuppetOA }  from 'wechaty-puppet-official-account'

import type * as WECHATY from 'wechaty'

import type { FridayConfig } from '../../config/friday-config.js'

import { getPlugins } from './plugins/mod.js'

@Injectable()
class OABuilder implements WECHATY.BuilderInterface {

  protected name            : string
  protected appId           : string
  protected appSecret       : string
  protected token           : string
  protected webhookProxyUrl : string

  constructor (
    protected config: FridayConfig,
    protected log: Brolog,
  ) {
    this.log.verbose('OABuilder', 'constructor({name: %s, webhookProxyUrl: %s})',
      config.oa.name,
      config.oa.webhookProxyUrl,
    )

    this.appId           = config.oa.appId
    this.appSecret       = config.oa.appSecret
    this.name            = config.oa.name
    this.token           = config.oa.token
    this.webhookProxyUrl = config.oa.webhookProxyUrl
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
