import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import { Brolog } from 'brolog'
import { PuppetWhatsapp } from 'wechaty-puppet-whatsapp'

import type { FridaySetting } from '../../setting/friday-setting.js'
import { getPlugins } from './plugins/mod.js'

@Injectable()
class WhatsappBuilder implements WECHATY.BuilderInterface {

  protected name: string

  constructor (
    protected config: FridaySetting,
    protected log: Brolog,
  ) {
    this.log.verbose('WhatsappBuilder', 'constructor(%s)',
      config.whatsapp.name,
    )

    this.name = config.whatsapp.name
  }

  build () {
    this.log.verbose('WhatsappBuilder', 'build()')

    const puppet = new PuppetWhatsapp()
    const name = this.name

    const wechaty = WECHATY.WechatyBuilder.build({
      name,
      puppet,
    })

    wechaty.use(getPlugins())

    return wechaty
  }

}

export { WhatsappBuilder }
