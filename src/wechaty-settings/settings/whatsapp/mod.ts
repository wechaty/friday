import { Injectable } from '@nestjs/common'
import { Brolog } from 'brolog'

// import { EnvVar } from '../env-var.js'
import type { NamedInterface } from '../../named-interface.js'

@Injectable()
class WhatsAppSettings implements NamedInterface {

  readonly name = 'WhatsApp'
  readonly wechatyRoomId = '120363039693955850@g.us'

  constructor (
    private log: Brolog,
  ) {
    this.log.verbose('WhatsAppSettings', 'constructor(%s)', this.name)
  }

}

export {
  WhatsAppSettings,
}
