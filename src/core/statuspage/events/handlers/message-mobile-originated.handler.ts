import {
  type IEventHandler,
  EventsHandler,
}                         from '@nestjs/cqrs'

import {
  MessageMobileOriginatedEvent,
}                                       from '../impls/mod.js'

@EventsHandler(MessageMobileOriginatedEvent)
export class MessageMobileOriginatedHandler implements IEventHandler<MessageMobileOriginatedEvent> {

  constructor () {}

  async handle (_event: MessageMobileOriginatedEvent) {
  }

}
