import https from 'https'
import { Injectable } from '@nestjs/common'
import type {
  EventBus,
  QueryBus,
}                     from '@nestjs/cqrs'
import { Brolog }     from 'brolog'

import type { StatusPageSettings } from './status.settings.js'

/**
 * Atlassian's status page metric submitter
 *  https://statuspage.io
 */
const statusPageMetricSubmitter = (apiKey: string, pageId: string, metricId: string) => {
  const apiBase = 'https://api.statuspage.io/v1'

  const url = apiBase + '/pages/' + pageId + '/metrics/' + metricId + '/data.json'
  const authHeader = {
    Authorization: 'OAuth ' + apiKey,
  }
  const requestOptions = {
    headers: authHeader,
    method: 'POST',
  }

  return async function submit (value: number) {
    const timestamp = Math.floor(Date.now() / 1000)

    const data = {
      timestamp,
      value,
    }

    return new Promise<void>((resolve, reject) => {
      const request = https.request(url, requestOptions, function (res) {
        if (res.statusMessage === 'Unauthorized') {
          const error = new Error('Please ensure that your page code and authorization key are correct.')
          return reject(error)
        }
        res.on('error', reject)
        res.on('data', resolve)
      })
      const str = JSON.stringify({ data })
      request.end(str)
    })
  }
}

@Injectable()
export class StatusPageApiService {

  submitCommunityMemberCount:         (value: number) => Promise<void>
  submitMobileOriginatedMessageCount: (value: number) => Promise<void>
  submitMobileTerminatedMessageCount: (value: number) => Promise<void>

  constructor (
    private readonly log     : Brolog,
    private readonly settings: StatusPageSettings,
    private readonly eventBus : EventBus,
    private readonly queryBus : QueryBus,
  ) {
    this.submitMobileTerminatedMessageCount = statusPageMetricSubmitter(
      this.settings.apiKey,
      this.settings.pageId,
      this.settings.receivedMessages,
    )
    this.submitMobileOriginatedMessageCount = statusPageMetricSubmitter(
      this.settings.apiKey,
      this.settings.pageId,
      this.settings.sentMessages,
    )
    this.submitCommunityMemberCount = statusPageMetricSubmitter(
      this.settings.apiKey,
      this.settings.pageId,
      this.settings.members,
    )
  }
    
}
