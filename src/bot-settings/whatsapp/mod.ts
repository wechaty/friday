import { Injectable } from '@nestjs/common'
import type { Brolog } from 'brolog'

import type { NamedInterface } from '../named-interface.js'

@Injectable()
class WhatsAppSettings implements NamedInterface {

  readonly name = 'WhatsApp'

  constructor (
    private log: Logger,
  ) {
    this.log.verbose('WhatsAppSettings', 'constructor(%s)', this.name)
  }

}

export {
  WhatsAppSettings,
}
