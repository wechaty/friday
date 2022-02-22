import {
  Injectable,
}               from '@nestjs/common'
import { Brolog } from 'brolog'

import { EnvVar }               from '../../../infrastructure/mod.js'

import type { NamedInterface }  from '../../named-interface.js'

@Injectable()
export class QqSettings implements NamedInterface {

  readonly name = 'QQ'
  readonly wechatyRoomId = 'group_696864249' // Wechaty Developers' Home QQ

  readonly qq: number
  readonly disabled: boolean

  constructor (
    private readonly log: Brolog,
    envVar: EnvVar,
  ) {
    this.disabled = envVar
      .get('WECHATY_DISABLE_QQ')
      .default(0)
      .asBool()
    this.qq = envVar
      .get('WECHATY_PUPPET_OICQ_QQ')
      .required(true)
      .asIntPositive()

    this.log.verbose('QqSettings', 'constructor() %s%s: qq=%s, wechatyRoomId=%s',
      this.disabled ? 'DISABLED ' : '',
      this.name,
      this.qq,
      this.wechatyRoomId,
    )
  }

}
