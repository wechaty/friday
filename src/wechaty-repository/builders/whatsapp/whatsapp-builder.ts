import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import { Brolog } from 'brolog'
import { PuppetWhatsapp } from 'wechaty-puppet-whatsapp'

import { WhatsAppSettings } from '../../../wechaty-settings/mod.js'
import { getPlugins } from './plugins/mod.js'
import type { Builder } from '../builder.js'

@Injectable()
class WhatsAppBuilder implements Builder {

  constructor (
    private readonly log: Brolog,
    public readonly settings: WhatsAppSettings,
  ) {
    this.log.verbose('WhatsAppBuilder', 'constructor(%s)',
      settings.name,
    )
  }

  build () {
    this.log.verbose('WhatsAppBuilder', 'build()')

    const puppet = new PuppetWhatsapp()

    const wechaty = WECHATY.WechatyBuilder.build({
      name: this.settings.name,
      puppet,
    })

    wechaty.use(getPlugins())

    return wechaty
  }

}

export { WhatsAppBuilder }
