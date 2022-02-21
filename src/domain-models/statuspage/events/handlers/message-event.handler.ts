import type { EventBus, IEventHandler } from '@nestjs/cqrs'
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator.js'
import { Brolog } from 'brolog'
import { PuppetMessageReceivedEvent } from '../../../../wechaty-events/events/mod.js'

import type { WechatyRepository } from '../../../../wechaty-repository/mod.js'
import { MessageMobileTerminatedEvent, MessageMobileOriginatedEvent } from '../mod.js'

@EventsHandler(PuppetMessageReceivedEvent)
export class MessageEventHandler implements IEventHandler<PuppetMessageReceivedEvent> {

  constructor (
    private readonly log: Brolog,
    private repository: WechatyRepository,
    private eventBus: EventBus,
  ) {}

  async handle (event: PuppetMessageReceivedEvent) {
    this.log.verbose('MessageEventHandler', 'handle({ messageId: %s })', event.messageId)

    const wechaty = this.repository.findByPuppetId(event.puppetId)
    if (!wechaty) {
      this.log.warn('MessageEventHandler', 'handle({ messageId: %s }) puppetId "%s" not found', event.messageId, event.puppetId)
      return
    }
    const message = await wechaty.Message.find({ id: event.messageId })
    if (!message) {
      this.log.warn('MessageEventHandler', 'handle({ messageId: %s }) message not found', event.messageId)
      return
    }

    if (message.self()) {
      this.eventBus.publish(new MessageMobileOriginatedEvent(
        event.puppetId,
        event.messageId,
      ))
    } else {
      this.eventBus.publish(new MessageMobileTerminatedEvent(
        event.puppetId,
        event.messageId,
      ))
    }
  }

}
