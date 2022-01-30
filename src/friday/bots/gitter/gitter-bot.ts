import { Inject, Injectable } from '@nestjs/common'
import {
  WechatyBuilder,
}             from 'wechaty'
import { Brolog } from 'brolog'

import { PuppetGitter }  from 'wechaty-puppet-gitter'
import type { WechatyInterface } from 'wechaty/impls'

import type { FridayConfig } from '../../config/friday-config.js'

import type {
  WechatyContainer,
}                             from '../interfaces.js'

import { getPlugins } from './plugins/mod.js'

@Injectable()
class WechatyGitter implements WechatyContainer {

  public wechaty: WechatyInterface

  constructor (
    protected config: FridayConfig,
    protected log: Brolog,
  ) {
    log.verbose('WechatyGitter', 'constructor()')

    const token = config.gitter.token

    const puppet = new PuppetGitter({
      token,
    })

    this.wechaty = WechatyBuilder.build({
      name: 'friday-gitter',
      puppet,
    })

    this.wechaty.use(getPlugins())
  }

}

export {
  WechatyGitter,
}
