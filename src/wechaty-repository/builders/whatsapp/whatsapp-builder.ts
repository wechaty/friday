import { Injectable } from '@nestjs/common'
import * as WECHATY from 'wechaty'
import { Brolog } from 'brolog'
import { PuppetWhatsapp } from 'wechaty-puppet-whatsapp'

import { WhatsAppSettings } from '../../../wechaty-settings/mod.js'
import { getPlugins } from './plugins/mod.js'

@Injectable()
class WhatsAppBuilder implements WECHATY.BuilderInterface {

  readonly disabled: boolean

  constructor (
    private readonly log: Brolog,
    private readonly settings: WhatsAppSettings,
  ) {
    this.log.verbose('WhatsappBuilder', 'constructor(%s) %s',
      settings.name,
      settings.disabled ? 'DISABLED' : '',
    )

    this.disabled = settings.disabled
  }

  build () {
    this.log.verbose('WhatsappBuilder', 'build()')

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
