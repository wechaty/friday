import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import { Brolog } from 'brolog'
import { PuppetWhatsapp } from 'wechaty-puppet-whatsapp'

import { WhatsAppSettings } from '../../../wechaty-settings/mod.js'
import { getPlugins } from './plugins/mod.js'

@Injectable()
class WhatsAppBuilder implements WECHATY.BuilderInterface {

  private name: string

  constructor (
    private readonly log: Brolog,
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
