import { ClassifyMoMtHandler }                    from './classify-mo-mt.handler.js'
import { SubmitCommunityMembersCounterHandler }   from './submit-community-members-count.handler.js'
import { SubmitMobileOriginatedCountHandler }     from './submit-mobile-originated-count.handler.js'
import { SubmitMobileTerminatedCountHandler }     from './submit-mobile-terminated-count.handler.js'

const CommandHandlers = [
  ClassifyMoMtHandler,
  SubmitCommunityMembersCounterHandler,
  SubmitMobileOriginatedCountHandler,
  SubmitMobileTerminatedCountHandler,
]

export {
  CommandHandlers,
}
