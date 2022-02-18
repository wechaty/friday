import type { EventBus, IEventHandler } from '@nestjs/cqrs'
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator.js'
import { Brolog } from 'brolog'
import { PuppetMessageReceivedEvent } from '../../../bot-repository/events/mod.js'

import type { BotRepository } from '../../../bot-repository/mod.js'
import { MessageMobileTerminatedEvent, MessageMobileOriginatedEvent } from '../mod.js'

@EventsHandler(PuppetMessageReceivedEvent)
export class MessageEventHandler implements IEventHandler<PuppetMessageReceivedEvent> {

  constructor (
    private log: Brolog,
    private repository: BotRepository,
    private eventBus: EventBus,
  ) {}

  async handle (event: PuppetMessageReceivedEvent) {
    this.log.verbose('MessageEventHandler', 'handle({ messageId: %s })', event.messageId)

    const bot = this.repository.findByPuppetId(event.puppetId)
    if (!bot) {
      this.log.warn('MessageEventHandler', 'handle({ messageId: %s }) puppetId "%s" not found', event.messageId, event.puppetId)
      return
    }
    const message = await bot.wechaty.Message.find({ id: event.messageId })
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
