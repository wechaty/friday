import { SubmitCommunityMembersCounterHandler } from './submit-community-members-count.handler.js'
import { SubmitReceivedMessagesCounterHandler } from './submit-received-messages-count.handler.js'
import { SubmitSentMessagesCountHandler }       from './submit-sent-messages-count.handler.js'

const CommandHandlers = [
  SubmitCommunityMembersCounterHandler,
  SubmitReceivedMessagesCounterHandler,
  SubmitSentMessagesCountHandler,
]

export {
  CommandHandlers,
}
