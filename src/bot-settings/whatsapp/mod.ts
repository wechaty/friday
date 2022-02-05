import { Injectable } from '@nestjs/common'
import type { Brolog } from 'brolog'

import type { NamedInterface } from '../named-interface.js'

@Injectable()
class WhatsAppSettings implements NamedInterface {

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
