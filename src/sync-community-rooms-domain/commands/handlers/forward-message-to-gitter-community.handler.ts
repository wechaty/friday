import { Brolog } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import type { BotRepository } from '../../../bot-repository/mod.js'

import { ForwardMessageToGitterCommunityCommand } from '../mod.js'
import {
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                             from '../../queries/mod.js'
import { PuppetSendMessageCommand } from '../../../cqrs/commands/mod.js'
import type { GitterSettings } from '../../../bot-settings/mod.js'

@CommandHandler(ForwardMessageToGitterCommunityCommand)
export class ForwardMessageToGitterCommunityHandler implements ICommandHandler<ForwardMessageToGitterCommunityCommand> {

  private puppetId?: string
  private roomId: string

  constructor (
    private readonly log: Brolog,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: BotRepository,
    settings: GitterSettings,
  ) {
    this.roomId = settings.wechatyRoomId
  }

  private async getPuppetId (): Promise<string> {
    if (!this.puppetId) {
      const bot = await this.repository.find('Gitter')
      if (!bot) {
        throw new Error('can not find bot for Gitter')
      }
      this.puppetId = bot.wechaty.puppet.id
    }

    return this.puppetId
  }

  async execute (command: ForwardMessageToGitterCommunityCommand) {
    this.log.verbose('ForwardMessageToGitterCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

    const sayable: undefined | PUPPET.payloads.Sayable = await this.queryBus.execute(
      new GetMessageSayableQuery(
        command.puppetId,
        command.messageId,
      )
    )
    if (!sayable) {
      return
    }

    const signature: string = await this.queryBus.execute(
      new GetMessageSignatureQuery(
        'markdown',
        command.puppetId,
        command.messageId,
      )
    )

    await this.commandBus.execute(
      new PuppetSendMessageCommand(
        await this.getPuppetId(),
        this.roomId,
        PUPPET.payloads.sayable.text(signature),
      ),
    )
    await this.commandBus.execute(
      new PuppetSendMessageCommand(
        await this.getPuppetId(),
        this.roomId,
        sayable,
      ),
    )

  }

}
