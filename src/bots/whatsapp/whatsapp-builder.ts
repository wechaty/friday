import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import { Brolog } from 'brolog'
import { PuppetWhatsapp } from 'wechaty-puppet-whatsapp'

import type { WhatsAppSettings } from '../../bot-settings/mod.js'
import { getPlugins } from './plugins/mod.js'

@Injectable()
class WhatsAppBuilder implements WECHATY.BuilderInterface {

  protected name: string

  constructor (
    protected settings: WhatsAppSettings,
    protected log: Brolog,
  ) {
    this.log.verbose('WhatsappBuilder', 'constructor(%s)',
      settings.name,
    )

    this.name = settings.name
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

export { WhatsAppBuilder }
