import { Injectable } from '@nestjs/common'
import type { Brolog } from 'brolog'

import type { NamedSetting } from '../named-setting.js'

@Injectable()
class WhatsAppSettings implements NamedSetting {

  constructor (
    protected log: Brolog,

    public name = 'friday@whatsapp',
  ) {
    this.log.verbose('WhatsAppSettings', 'constructor(%s)', this.name)
  }

}

export {
  WhatsAppSettings,
}
