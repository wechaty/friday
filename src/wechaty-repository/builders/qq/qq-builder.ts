import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import { Brolog } from 'brolog'

import { PuppetOICQ }  from 'wechaty-puppet-oicq'

import { getPlugins } from './plugins/mod.js'
import { QqSettings } from '../../../wechaty-settings/mod.js'

@Injectable()
export class QqBuilder implements WECHATY.BuilderInterface {

  private qq: number
  private name: string

  disabled: boolean

  constructor (
    private readonly log: Brolog,
    settings: QqSettings,
  ) {
    this.log.verbose('OicqBuilder', 'constructor({name: %s, qq: %s}) %s',
      settings.name,
      settings.qq,
      settings.disabled ? 'DISABLED' : '',
    )

    this.disabled = settings.disabled
    this.name     = settings.name
    this.qq       = settings.qq
  }

  build () {
    this.log.verbose('OicqBuilder', 'build()')

    const puppet = new PuppetOICQ({ qq: this.qq })

    const wechaty = WECHATY.WechatyBuilder.build({
      name: this.name,
      puppet,
    })

    wechaty.use(getPlugins())

    return wechaty
  }

}
