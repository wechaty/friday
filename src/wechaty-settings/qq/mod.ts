import type { Logger } from 'brolog'
import { Injectable } from '@nestjs/common'

import { EnvVar } from '../env-var.js'
import type { NamedInterface } from '../named-interface.js'

@Injectable()
export class QqSettings implements NamedInterface {

  readonly name = 'QQ'
  readonly wechatyRoomId = 'group_696864249' // Wechaty Developers' Home QQ

  readonly qq: number

  constructor (
    private readonly log: Logger,
    envVar: EnvVar,
  ) {
    this.qq = envVar
      .get('WECHATY_PUPPET_OICQ_QQ')
      .required(true)
      .asIntPositive()

    this.log.verbose('QqSettings', 'constructor(%s) qq=%s, wechatyRoomId=%s', this.name, this.qq, this.wechatyRoomId)
  }

}
