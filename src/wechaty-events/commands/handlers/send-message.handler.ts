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
      this.log.warn('SendMessageHandler', 'execute() no wechaty found for puppetId: %s', command.puppetId)
      return
    }

    if (!wechaty.isLoggedIn) {
      this.log.warn('SendMessageHandler', 'execute() wechaty is not logged in for puppetId: %s', command.puppetId)
      return
    }

    try {
      await wechaty.puppet.messageSend(
        command.conversaionId,
        command.sayable,
      )
    } catch (e) {
      this.log.error('SendMessageHandler', 'execute() puppet.messageSend() exception: %s', (e as Error).message)
      console.error(e)
    }
  }

}
