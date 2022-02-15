import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import { Brolog } from 'brolog'

import { PuppetOICQ }  from 'wechaty-puppet-oicq'

import { getPlugins } from './plugins/mod.js'
import type { QqSettings } from '../../bot-settings/mod.js'

@Injectable()
export class QqBuilder implements WECHATY.BuilderInterface {

  protected qq: number
  protected name: string

  constructor (
    protected settings: QqSettings,
    protected log: Brolog,
  ) {
    this.log.verbose('OicqBuilder', 'constructor({name: %s, qq: %s})',
      settings.name,
      settings.qq,
    )

    this.name = settings.name
    this.qq   = settings.qq
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
