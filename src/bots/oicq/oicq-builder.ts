import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import { Brolog } from 'brolog'

import { PuppetOICQ }  from 'wechaty-puppet-oicq'

import type { FridayConfig } from '../../config/friday-config.js'
import { getPlugins } from './plugins/mod.js'

@Injectable()
class OicqBuilder implements WECHATY.BuilderInterface {

  protected qq: number
  protected name: string

  constructor (
    protected config: FridayConfig,
    protected log: Brolog,
  ) {
    this.log.verbose('OicqBuilder', 'constructor({name: %s, qq: %s})',
      config.oicq.name,
      config.oicq.qq,
    )

    this.name = config.oicq.name
    this.qq   = config.oicq.qq
  }

  build () {
    this.log.verbose('OicqBuilder', 'build()')

    const puppet = new PuppetOICQ({ qq: this.qq })
    const name = this.name

    const wechaty = WECHATY.WechatyBuilder.build({
      name,
      puppet,
    })

    wechaty.use(getPlugins())

    return wechaty
  }

}

export { OicqBuilder }
