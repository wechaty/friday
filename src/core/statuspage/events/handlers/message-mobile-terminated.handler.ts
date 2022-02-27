import {
  type IEventHandler,
  EventsHandler,
}                         from '@nestjs/cqrs'

import {
  MessageMobileTerminatedEvent,
}                                       from '../impls/mod.js'

@EventsHandler(MessageMobileTerminatedEvent)
export class MessageMobileTerminatedHandler implements IEventHandler<MessageMobileTerminatedEvent> {

  constructor () {}

  async handle (_event: MessageMobileTerminatedEvent) {
  }

}
