import {
  CommandHandler,
  ICommandHandler,
}                       from '@nestjs/cqrs'
import { Brolog }       from 'brolog'

import { WechatyRepository }  from '../../../wechaty-repository/mod.js'

import { SendMessageCommand } from '../impls/mod.js'

@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand> {

  constructor (
    private readonly log: Brolog,
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
