import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import type { Logger } from 'brolog'
import { PuppetWhatsapp } from 'wechaty-puppet-whatsapp'

import type { WhatsAppSettings } from '../../wechaty-settings/mod.js'
import { getPlugins } from './plugins/mod.js'

@Injectable()
class WhatsAppBuilder implements WECHATY.BuilderInterface {

  private name: string

  constructor (
    private log: Logger,
    settings: WhatsAppSettings,
  ) {
    this.log.verbose('WhatsappBuilder', 'constructor(%s)',
      settings.name,
    )

    this.name = settings.name
  }

  build () {
    this.log.verbose('WhatsappBuilder', 'build()')

    const puppet = new PuppetWhatsapp()

    const wechaty = WECHATY.WechatyBuilder.build({
      name: this.name,
      puppet,
    })

    wechaty.use(getPlugins())

    return wechaty
  }

}

export { WhatsAppBuilder }
