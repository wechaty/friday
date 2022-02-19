import * as envVar from 'env-var'
import type { Logger } from 'brolog'
import { Injectable } from '@nestjs/common'

@Injectable()
class StatusPageSettings {

  constructor (
    protected log: Logger,

    public apiKey = envVar
      .get('STATUS_PAGE_API_KEY')
      .required(true)
      .asString(),

    public pageId = envVar
      .get('STATUS_PAGE_PAGE_ID')
      .required(true)
      .asString(),

    public members = envVar
      .get('STATUS_PAGE_METRIC_ID_MEMBERS')
      .required(true)
      .asString(),

    public receivedMessages = envVar
      .get('STATUS_PAGE_METRIC_ID_RECEIVED_MESSAGES')
      .required(true)
      .asString(),

    public sentMessages = envVar
      .get('STATUS_PAGE_METRIC_ID_SENT_MESSAGES')
      .required(true)
      .asString(),
  ) {
    this.log.verbose('StatusPageSettings', 'constructor()')
  }

}

export {
  StatusPageSettings,
}
