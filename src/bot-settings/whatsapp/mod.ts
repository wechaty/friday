import { Injectable } from '@nestjs/common'
import type { Logger } from 'brolog'

import type { NamedInterface } from '../named-interface.js'

@Injectable()
class WhatsAppSettings implements NamedInterface {

  readonly name = 'WhatsApp'

  constructor (
    private log: Logger,
    public wechatyRoomId = '120363039693955850@g.us',
  ) {
    this.log.verbose('WhatsAppSettings', 'constructor(%s)', this.name)
  }

}

export {
  WhatsAppSettings,
}
