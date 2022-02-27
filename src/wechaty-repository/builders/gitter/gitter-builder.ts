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

  disabled: boolean

  constructor (
    private readonly log: Brolog,
    private readonly settings: GitterSettings,
  ) {
    this.log.verbose('GitterBuilder', 'constructor({name: %s, token: %s}) %s',
      settings.name,
      settings.token,
      settings.disabled ? 'DISABLED' : '',
    )

    this.disabled = settings.disabled
  }

  build () {
    this.log.verbose('GitterBuilder', 'build()')

    const puppet = new PuppetGitter({
      token: this.settings.token,
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
  GitterBuilder,
}
