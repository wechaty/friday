import { Brolog } from 'brolog'
import { Injectable } from '@nestjs/common'

import { EnvVar } from '../../infrastructures/mod.js'

@Injectable()
class StatuspageSettings {

  public readonly apiKey: string
  public readonly pageId: string
  public readonly members: string
  public readonly receivedMessages: string
  public readonly sentMessages: string

  constructor (
    private readonly log: Brolog,
    envVar: EnvVar,
  ) {
    this.log.verbose('StatusPageSettings', 'constructor()')

    this.apiKey = envVar
      .get('STATUS_PAGE_API_KEY')
      .required(true)
      .asString()

    this.pageId = envVar
      .get('STATUS_PAGE_PAGE_ID')
      .required(true)
      .asString()

    this.members = envVar
      .get('STATUS_PAGE_METRIC_ID_MEMBERS')
      .required(true)
      .asString()

    this.receivedMessages = envVar
      .get('STATUS_PAGE_METRIC_ID_RECEIVED_MESSAGES')
      .required(true)
      .asString()

    this.sentMessages = envVar
      .get('STATUS_PAGE_METRIC_ID_SENT_MESSAGES')
      .required(true)
      .asString()
  }

}

export {
  StatuspageSettings,
}
