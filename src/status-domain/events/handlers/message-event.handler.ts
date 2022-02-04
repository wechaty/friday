import type { EventBus, IEventHandler } from '@nestjs/cqrs'
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator.js'
import { Brolog } from 'brolog'

import type { BotRepository } from '../../../bots/mod.js'
import { MessageEvent } from '../impls/community-developers-counted.event.js'
import { MessageReceivedEvent, MessageSentEvent } from '../mod.js'

@EventsHandler(MessageEvent)
export class MessageEventHandler implements IEventHandler<MessageEvent> {

  constructor (
    private log: Brolog,
    private repository: BotRepository,
    private eventBus: EventBus,
  ) {}

  async handle (event: MessageEvent) {
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
      this.eventBus.publish(new MessageSentEvent(event.messageId))
    } else {
      this.eventBus.publish(new MessageReceivedEvent(event.messageId))
    }
  }

}
