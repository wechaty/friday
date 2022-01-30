import { Injectable } from '@nestjs/common'
import {
  WechatyBuilder,
}             from 'wechaty'
import { Brolog } from 'brolog'

import { PuppetOICQ }  from 'wechaty-puppet-oicq'
import type { WechatyInterface } from 'wechaty/impls'

import type {
  WechatyContainer,
}                             from '../interfaces.js'

import type { FridayConfig } from '../../config/friday-config.js'
import { getPlugins } from './plugins/mod.js'

@Injectable()
class OicqWechaty implements WechatyContainer {

  public wechaty: WechatyInterface

  constructor (
    protected config: FridayConfig,
    protected log: Brolog,
  ) {
    log.verbose('QicqWechaty', 'constructor(%s)', config.oicq.qq)

    const puppet = new PuppetOICQ({ qq: config.oicq.qq })

    this.wechaty = WechatyBuilder.build({
      name: 'friday-oicq',
      puppet,
    })

    this.wechaty.use(getPlugins())
  }

}

export { OicqWechaty }
