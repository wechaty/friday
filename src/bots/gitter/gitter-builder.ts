import { Inject, Injectable } from '@nestjs/common'
import {
  WechatyBuilder,
}             from 'wechaty'
import { Brolog } from 'brolog'

import { PuppetGitter }  from 'wechaty-puppet-gitter'
import type * as WECHATY from 'wechaty'

import type { FridaySetting } from '../../setting/friday-setting.js'

import { getPlugins } from './plugins/mod.js'

@Injectable()
class GitterBuilder implements WECHATY.BuilderInterface {

  protected token: string
  protected name: string

  constructor (
    protected config: FridaySetting,
    protected log: Brolog,
  ) {
    this.log.verbose('GitterBuilder', 'constructor({name: %s, token: %s})',
      config.gitter.name,
      config.gitter.token,
    )

    this.name  = config.gitter.name
    this.token = config.gitter.token
  }

  build () {
    this.log.verbose('GitterBuilder', 'build()')

    const token = this.token
    const name = this.name

    const puppet = new PuppetGitter({
      token,
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
  GitterBuilder,
}
