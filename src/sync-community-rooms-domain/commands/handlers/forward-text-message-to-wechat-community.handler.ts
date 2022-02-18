import type { Logger } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import type { BotRepository } from '../../../bot-repository/mod.js'

import {
  ForwardTextMessageToWeChatCommunityCommand,
}                                               from '../mod.js'
import {
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                             from '../../queries/mod.js'
import { PuppetSendMessageCommand } from '../../../cqrs/commands/mod.js'
import type { WeChatSettings } from '../../../bot-settings/mod.js'

@CommandHandler(ForwardTextMessageToWeChatCommunityCommand)
export class ForwardTextMessageToWeChatCommunityHandler implements ICommandHandler<ForwardTextMessageToWeChatCommunityCommand> {

  private puppetId?: string

  // TODO: add the WeChat rooms logic
  private roomId: string

  constructor (
    private readonly log: Logger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: BotRepository,
    settings: WeChatSettings,
  ) {
    // TODO: add the WeChat rooms logic
    this.roomId = settings.rooms.bot5Club.rooms[1]
  }

  private async getPuppetId (): Promise<string> {
    if (!this.puppetId) {
      const bot = await this.repository.find('WeChat')
      if (!bot) {
        throw new Error('can not find bot for WeChat')
      }
      this.puppetId = bot.wechaty.puppet.id
    }

    return this.puppetId
  }

  async execute (command: ForwardTextMessageToWeChatCommunityCommand) {
    this.log.verbose('ForwardTextMessageToWeChatCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

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
