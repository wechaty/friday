import { Injectable } from '@nestjs/common'
import { Brolog }     from 'brolog'
import fetch          from 'cross-fetch'

import { StatuspageSettings } from './statuspage.settings.js'

/**
 * Atlassian's status page metric submitter
 *  https://statuspage.io
 */
const statuspageMetricSubmitter = (
  log: Brolog,
  apiKey: string,
  pageId: string,
  metricId: string,
) => {
  log.verbose('StatuspageService', 'statuspageMetricSubmitter() metricId=%s', metricId)

  const apiBase = 'https://api.statuspage.io/v1'

  const url               = apiBase + '/pages/' + pageId + '/metrics/' + metricId + '/data.json'
  const authHeader        = { Authorization: 'OAuth ' + apiKey }
  const contentTypeHeader = { 'Content-Type': 'application/json' }

  const requestOptions = {
    headers: {
      ...authHeader,
      ...contentTypeHeader,
    },
    method: 'POST',
  }

  return async function submit (value: number) {
    log.verbose('StatuspageService', 'statuspageMetricSubmitter() submit(%d) metricId=%s', value, metricId)
    const timestamp = Math.floor(Date.now() / 1000)

    const data = {
      timestamp,
      value,
    }

    const response = await fetch(url, {
      ...requestOptions,
      body: JSON.stringify({ data }),
    })

    if (response.statusText === 'Unauthorized') {
      log.error('StatuspageService', 'submit(%d) please ensure that your page code and authorization key are correct.', value)
      return
    }

    if (!response.ok) {
      log.error('StatuspageService', 'submit() fetch request fail', response.statusText)
      console.error(response)
    }
  }
}

@Injectable()
export class StatuspageService {

  submitCommunityMemberCount:         (value: number) => Promise<void>
  submitMobileOriginatedMessageCount: (value: number) => Promise<void>
  submitMobileTerminatedMessageCount: (value: number) => Promise<void>

  constructor (
    private readonly settings: StatuspageSettings,
    readonly log: Brolog,
  ) {
    this.submitMobileTerminatedMessageCount = statuspageMetricSubmitter(
      log,
      this.settings.apiKey,
      this.settings.pageId,
      this.settings.receivedMessages,
    )
    this.submitMobileOriginatedMessageCount = statuspageMetricSubmitter(
      log,
      this.settings.apiKey,
      this.settings.pageId,
      this.settings.sentMessages,
    )
    this.submitCommunityMemberCount = statuspageMetricSubmitter(
      log,
      this.settings.apiKey,
      this.settings.pageId,
      this.settings.members,
    )
  }

}
