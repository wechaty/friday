import * as envVar from 'env-var'
import type { Brolog } from 'brolog'
import { Injectable } from '@nestjs/common'

import type { NamedInterface } from '../named-interface.js'

@Injectable()
class OaSettings implements NamedInterface {

  readonly name = 'OfficialAccount'

  constructor (
    private readonly log: Logger,

    public readonly appId = envVar
      .get('HUAN_APP_ID')
      .required(true)
      .asString(),

    public readonly appSecret = envVar
      .get('HUAN_APP_SECRET')
      .required(true)
      .asString(),

    public readonly token = envVar
      .get('HUAN_TOKEN')
      .required(true)
      .asString(),

    public readonly webhookProxyUrl = envVar
      .get('HUAN_WEBHOOK_PROXY_URL')
      .required(true)
      .asString(),

  ) {
    this.log.verbose('OaSettings', 'constructor(%s) appId=%s, webhookProxyUrl=%s', this.name, appId, webhookProxyUrl)
  }

}

export {
  OaSettings,
}
