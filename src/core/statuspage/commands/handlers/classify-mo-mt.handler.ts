import { Brolog } from 'brolog'
import {
  CommandHandler,
  EventBus,
  ICommandHandler,
}                       from '@nestjs/cqrs'

import { WechatyRepository } from '../../../../wechaty-repository/mod.js'

import {
  MessageMobileOriginatedEvent,
  MessageMobileTerminatedEvent,
}                                 from '../../events/mod.js'

import { ClassifyMoMtCommand }    from '../mod.js'

@CommandHandler(ClassifyMoMtCommand)
export class ClassifyMoMtHandler implements ICommandHandler<ClassifyMoMtCommand> {

  constructor (
    private readonly log: Brolog,
    private readonly repository: WechatyRepository,
    private readonly eventBus: EventBus,
  ) {}

  async execute (command: ClassifyMoMtCommand) {
    this.log.verbose('ClassifyMoMtHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

    const wechaty = this.repository.findByPuppetId(command.puppetId)
    if (!wechaty) {
      this.log.warn('ClassifyMoMtHandler', 'execute({ messageId: %s }) puppetId "%s" not found', command.messageId, command.puppetId)
      return
    }
    const message = await wechaty.Message.find({ id: command.messageId })
    if (!message) {
      this.log.warn('ClassifyMoMtHandler', 'execute({ messageId: %s }) message not found', command.messageId)
      return
    }

    if (message.self()) {
      this.eventBus.publish(
        new MessageMobileOriginatedEvent(
          command.puppetId,
          command.messageId,
        ),
      )
    } else {
      this.eventBus.publish(
        new MessageMobileTerminatedEvent(
          command.puppetId,
          command.messageId,
        ),
      )
    }
  }

}
