import { Injectable } from '@nestjs/common'
import {
  WechatyBuilder,
}             from 'wechaty'
import { Brolog } from 'brolog'

import { PuppetGitter }  from 'wechaty-puppet-gitter'
import type * as WECHATY from 'wechaty'

import { getPlugins } from './plugins/mod.js'
import type { GitterSettings } from '../../bot-settings/gitter/mod.js'

@Injectable()
class GitterBuilder implements WECHATY.BuilderInterface {

  private token:  string
  private name:   string

  constructor (
    private log: Brolog,
    settings: GitterSettings,
  ) {
    this.log.verbose('GitterBuilder', 'constructor({name: %s, token: %s})',
      settings.name,
      settings.token,
    )

    this.name  = settings.name
    this.token = settings.token
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
