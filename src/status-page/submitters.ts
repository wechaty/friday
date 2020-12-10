import { statusPageMetricSubmitter } from './metric-submitter'

const apiKey          = process.env.STATUS_PAGE_API_KEY
const pageId          = process.env.STATUS_PAGE_PAGE_ID

const metricIds = {
  members          : process.env.STATUS_PAGE_METRIC_ID_MEMBERS,
  receivedMessages : process.env.STATUS_PAGE_METRIC_ID_RECEIVED_MESSAGES,
  sentMessages     : process.env.STATUS_PAGE_METRIC_ID_SENT_MESSAGES,
}

if (!apiKey || !pageId) {
  throw new Error('no status page api env variables: apiKey or pageId')
}
if (!metricIds.members || !metricIds.sentMessages || !metricIds.receivedMessages) {
  throw new Error('no status page api env variables: members or sentMessages or receivedMessages')
}

const metricSubmitter = statusPageMetricSubmitter(apiKey)(pageId)

const submitMembersCount          = metricSubmitter(metricIds.members)
const submitMessagesSentCount     = metricSubmitter(metricIds.sentMessages)
const submitMessagesReceivedCount = metricSubmitter(metricIds.receivedMessages)

export {
  submitMembersCount,
  submitMessagesReceivedCount,
  submitMessagesSentCount,
}
