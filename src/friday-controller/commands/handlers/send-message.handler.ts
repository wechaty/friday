import {
  CommandHandler,
  ICommandHandler,
}                         from '@nestjs/cqrs'
import type { Logger }    from 'brolog'

import { WechatyRepository }  from '../../../wechaty-repository/mod.js'

import { SendMessageCommand } from '../impl/mod.js'

@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand> {

  constructor (
    private readonly log: Logger,
    private readonly repository: WechatyRepository,
  ) {}

  async execute (command: SendMessageCommand) {
    this.log.verbose('SendMessageHandler', 'execute({puppetId: %s, conversationalId: %s})',
      command.puppetId,
      command.conversaionId,
    )

    const wechaty = await this.repository.findByPuppetId(command.puppetId)
    if (!wechaty) {
      return
    }

    await wechaty.puppet.messageSend(
      command.conversaionId,
      command.sayable,
    )
  }

}
