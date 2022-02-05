import * as envVar from 'env-var'
import type { Brolog } from 'brolog'
import { Injectable } from '@nestjs/common'

import type { NamedInterface } from '../named-interface.js'

@Injectable()
class OaSettings implements NamedInterface {

  constructor (
    protected log: Brolog,

    public appId = envVar
      .get('HUAN_APP_ID')
      .required(true)
      .asString(),

    public appSecret = envVar
      .get('HUAN_APP_SECRET')
      .required(true)
      .asString(),

    public token = envVar
      .get('HUAN_TOKEN')
      .required(true)
      .asString(),

    public webhookProxyUrl = envVar
      .get('HUAN_WEBHOOK_PROXY_URL')
      .required(true)
      .asString(),

    public name = 'friday@oa',

  ) {
    this.log.verbose('OaSettings', 'constructor(%s) appId=%s, webhookProxyUrl=%s', this.name, appId, webhookProxyUrl)
  }

}

export {
  OaSettings,
}
