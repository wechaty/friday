import {
  type IEventHandler,
  EventsHandler,
}                         from '@nestjs/cqrs'

import {
  CommunityDevelopersCountedEvent,
}                                       from '../impls/mod.js'

@EventsHandler(CommunityDevelopersCountedEvent)
export class CommunityDevelopersCountedHandler implements IEventHandler<CommunityDevelopersCountedEvent> {

  constructor () {}

  async handle (_event: CommunityDevelopersCountedEvent) {
  }

}
