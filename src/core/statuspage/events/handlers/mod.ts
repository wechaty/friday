import { CommunityDevelopersCountedHandler }  from './community-developers-counted.handler.js'
import { MessageMobileOriginatedHandler }     from './message-mobile-originated.handler.js'
import { MessageMobileTerminatedHandler }     from './message-mobile-terminated.handler.js'

export const EventHandlers = [
  CommunityDevelopersCountedHandler,
  MessageMobileOriginatedHandler,
  MessageMobileTerminatedHandler,
]
