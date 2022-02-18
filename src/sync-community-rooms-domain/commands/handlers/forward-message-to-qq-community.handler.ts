import { Brolog } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import type { BotRepository } from '../../../bot-repository/mod.js'

import { ForwardMessageToQqCommunityCommand } from '../mod.js'
import type { PrefixSayableService } from '../../prefix-sayable.service.js'
import { GetMessageChannelNameQuery, GetMessageSayablesQuery, GetMessageTalkerNameQuery } from '../../queries/mod.js'
import { PuppetSendMessageCommand } from '../../../cqrs/commands/mod.js'
import type { QqSettings } from '../../../bot-settings/mod.js'

@CommandHandler(ForwardMessageToQqCommunityCommand)
export class ForwardMessageToQqCommunityHandler implements ICommandHandler<ForwardMessageToQqCommunityCommand> {

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

  async execute (command: ForwardMessageToQqCommunityCommand) {
    this.log.verbose('ForwardMessageToQqCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

    let channelName: undefined | string = await this.queryBus.execute(
      new GetMessageChannelNameQuery(
        command.puppetId,
        command.messageId,
      )
    )
    if (!channelName) {
      channelName = 'UNKNOWN_CHANNEL'
    }

    let talkerName: undefined | string = await this.queryBus.execute(
      new GetMessageTalkerNameQuery(
        command.puppetId,
        command.messageId,
      )
    )
    if (!talkerName) {
      talkerName = 'UNKNOWN_TALKER'
    }

    const sayable: undefined | PUPPET.payloads.Sayable = await this.queryBus.execute(
      new GetMessageSayablesQuery(
        command.puppetId,
        command.messageId,
      )
    )
    if (!sayable) {
      return
    }

    const signatureText = [
      '[',
      talkerName || 'UNKNOWN',
      ` @ ${channelName || 'UNKNOWN'}`,
      ']: ',
    ].join('')

    await this.commandBus.execute(
      new PuppetSendMessageCommand(
        await this.getPuppetId(),
        this.roomId,
        PUPPET.payloads.sayable.text(signatureText),
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
