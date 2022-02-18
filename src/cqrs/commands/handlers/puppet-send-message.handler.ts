import {
  CommandHandler,
  ICommandHandler,
}                         from '@nestjs/cqrs'
import type { Brolog }    from 'brolog'

import { BotRepository }  from '../../../bot-repository/mod.js'

import { PuppetSendMessageCommand } from '../impl/mod.js'

@CommandHandler(PuppetSendMessageCommand)
export class PuppetSendMessageHandler implements ICommandHandler<PuppetSendMessageCommand> {

  constructor (
    private readonly log: Brolog,
    private readonly repository: BotRepository,
  ) {}

  async execute (command: PuppetSendMessageCommand) {
    this.log.verbose('PuppetSendMessageHandler', 'execute({puppetId: %s, conversationalId: %s})',
      command.puppetId,
      command.conversaionId,
    )

    const bot = await this.repository.findByPuppetId(command.puppetId)
    if (!bot) {
      return
    }

    await bot.wechaty.puppet.messageSend(
      command.conversaionId,
      command.sayable,
    )
  }

}
