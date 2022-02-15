import { SubmitCommunityMembersCounterHandler } from './submit-community-members-count.handler.js'
import { SubmitMobileTerminatedCountHandler } from './submit-mobile-terminated-count.handler.js'
import { SubmitMobileOriginatedCountHandler }       from './submit-mobile-originated-count.handler.js'

const CommandHandlers = [
  SubmitCommunityMembersCounterHandler,
  SubmitMobileTerminatedCountHandler,
  SubmitMobileOriginatedCountHandler,
]

export {
  CommandHandlers,
}
