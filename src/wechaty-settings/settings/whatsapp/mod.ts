import { Injectable } from '@nestjs/common'
import { Brolog } from 'brolog'

import { EnvVar } from '../../../infrastructure/mod.js'

import type { NamedInterface } from '../../named-interface.js'

@Injectable()
class WhatsAppSettings implements NamedInterface {

  readonly name = 'WhatsApp'
  readonly wechatyRoomId = '120363039693955850@g.us'

  readonly disabled: boolean

  constructor (
    private log: Brolog,
    envVar: EnvVar,
  ) {
    this.disabled = envVar
      .get('WECHATY_DISABLE_WHATSAPP')
      .default(0)
      .asBool()

    this.log.verbose('WhatsAppSettings', 'constructor() %s%s',
      this.disabled ? 'DISABLED ' : '',
      this.name,
    )
  }

}

export {
  WhatsAppSettings,
}
