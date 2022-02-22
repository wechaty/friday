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

  disabled: boolean

  constructor (
    private readonly log: Brolog,
    private readonly settings: OaSettings,
  ) {
    this.log.verbose('OABuilder', 'constructor({name: %s, webhookProxyUrl: %s}) %s',
      settings.name,
      settings.webhookProxyUrl,
      settings.disabled ? 'DISABLED' : '',
    )

    this.disabled        = settings.disabled
  }

  build () {
    this.log.verbose('OABuilder', 'build()')

    const puppet = new PuppetOA({
      appId           : this.settings.appId,
      appSecret       : this.settings.appSecret,
      token           : this.settings.token,
      webhookProxyUrl : this.settings.webhookProxyUrl,
    })

    const wechaty = WechatyBuilder.build({
      name: this.settings.name,
      puppet,
    })

    wechaty.use(getPlugins())

    return wechaty
  }

}

export {
  OABuilder,
}
