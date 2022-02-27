import { Brolog } from 'brolog'
import { Injectable } from '@nestjs/common'

import { EnvVar }               from '../../../infrastructure/mod.js'

import type { NamedInterface }  from '../../named-interface.js'

@Injectable()
class OaSettings implements NamedInterface {

  readonly name = 'OfficialAccount'

  readonly appId: string
  readonly appSecret: string
  readonly token: string
  readonly webhookProxyUrl: string
  readonly disabled: boolean

  constructor (
    private readonly log: Brolog,
    envVar: EnvVar,
  ) {
    this.disabled = envVar
      .get('WECHATY_DISABLE_OA')
      .default(0)
      .asBool()

    this.appId = envVar
      .get('HUAN_APP_ID')
      .required(true)
      .asString()

    this.appSecret = envVar
      .get('HUAN_APP_SECRET')
      .required(true)
      .asString()

    this.token = envVar
      .get('HUAN_TOKEN')
      .required(true)
      .asString()

    this.webhookProxyUrl = envVar
      .get('HUAN_WEBHOOK_PROXY_URL')
      .required(true)
      .asString()

    this.log.verbose('OaSettings', 'constructor() %s%s: appId=%s, webhookProxyUrl=%s',
      this.disabled ? 'DISABLED ' : '',
      this.name,
      this.appId,
      this.webhookProxyUrl,
    )
  }

}

export {
  OaSettings,
}
