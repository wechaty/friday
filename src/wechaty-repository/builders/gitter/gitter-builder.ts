import { Injectable } from '@nestjs/common'
import {
  WechatyBuilder,
}             from 'wechaty'
import { Brolog } from 'brolog'

import { PuppetGitter }  from 'wechaty-puppet-gitter'
import type * as WECHATY from 'wechaty'

import { getPlugins } from './plugins/mod.js'
import { GitterSettings } from '../../../wechaty-settings/mod.js'

@Injectable()
class GitterBuilder implements WECHATY.BuilderInterface {

  private token:  string
  private name:   string

  disabled: boolean

  constructor (
    private readonly log: Brolog,
    settings: GitterSettings,
  ) {
    this.log.verbose('GitterBuilder', 'constructor({name: %s, token: %s}) %s',
      settings.name,
      settings.token,
      settings.disabled ? 'DISABLED' : '',
    )

    this.disabled = settings.disabled
    this.name     = settings.name
    this.token    = settings.token
  }

  build () {
    this.log.verbose('GitterBuilder', 'build()')

    const puppet = new PuppetGitter({
      token: this.token,
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
  GitterBuilder,
}
