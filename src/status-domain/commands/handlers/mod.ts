import { SubmitCommunityMembersCounterHandler } from './submit-community-members-counter.handler.js'
import { SubmitReceivedMessagesCounterHandler } from './submit-received-messages-counter.handler.js'
import { SubmitSentMessagesCounterHandler }     from './submit-sent-messages-counter.handler.js'

const CommandHandlers = [
  SubmitCommunityMembersCounterHandler,
  SubmitReceivedMessagesCounterHandler,
  SubmitSentMessagesCounterHandler,
]

export {
  CommandHandlers,
}
