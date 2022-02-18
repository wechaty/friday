import { Brolog } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import type { BotRepository } from '../../../bot-repository/mod.js'

import {
  ForwardTextMessageToQqCommunityCommand,
}                                           from '../mod.js'
import {
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                             from '../../queries/mod.js'
import { PuppetSendMessageCommand } from '../../../cqrs/commands/mod.js'
import type { QqSettings } from '../../../bot-settings/mod.js'

@CommandHandler(ForwardTextMessageToQqCommunityCommand)
export class ForwardTextMessageToQqCommunityHandler implements ICommandHandler<ForwardTextMessageToQqCommunityCommand> {

  private puppetId?: string
  private roomId: string

  constructor (
    private readonly log: Brolog,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: BotRepository,
    settings: QqSettings,
  ) {
    this.roomId = settings.wechatyRoomId
  }

  private async getPuppetId (): Promise<string> {
    if (!this.puppetId) {
      const bot = await this.repository.find('QQ')
      if (!bot) {
        throw new Error('can not find bot for Qq')
      }
      this.puppetId = bot.wechaty.puppet.id
    }

    return this.puppetId
  }

  async execute (command: ForwardTextMessageToQqCommunityCommand) {
    this.log.verbose('ForwardTextMessageToQqCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

    const sayable: undefined | PUPPET.payloads.Sayable = await this.queryBus.execute(
      new GetMessageSayableQuery(
        command.puppetId,
        command.messageId,
      )
    )
    if (!sayable) {
      return
    }

    if (sayable.type !== PUPPET.types.Sayable.Text) {
      return
    }

    const signature: string = await this.queryBus.execute(
      new GetMessageSignatureQuery(
        'plaintext',
        command.puppetId,
        command.messageId,
      )
    )

    sayable.payload.text = [
      signature,
      sayable.payload.text,
    ].join('\n')

    await this.commandBus.execute(
      new PuppetSendMessageCommand(
        await this.getPuppetId(),
        this.roomId,
        sayable,
      )
    )
  }

}
