import { Brolog } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import type { BotRepository } from '../../../bot-repository/mod.js'

import { ForwardTextMessageToWhatsAppCommunityCommand } from '../mod.js'
import type { PrefixSayableService } from '../../prefix-sayable.service.js'
import { GetMessageChannelNameQuery, GetMessageSayablesQuery, GetMessageTalkerNameQuery } from '../../queries/mod.js'
import { PuppetSendMessageCommand } from '../../../cqrs/commands/mod.js'
import type { WhatsAppSettings } from '../../../bot-settings/mod.js'

@CommandHandler(ForwardTextMessageToWhatsAppCommunityCommand)
export class ForwardTextMessageToWhatsAppCommunityHandler implements ICommandHandler<ForwardTextMessageToWhatsAppCommunityCommand> {

  private puppetId?: string
  private roomId: string

  constructor (
    private readonly log: Brolog,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: BotRepository,
    settings: WhatsAppSettings,
  ) {
    this.roomId = settings.wechatyRoomId
  }

  private async getPuppetId (): Promise<string> {
    if (!this.puppetId) {
      const bot = await this.repository.find('WhatsApp')
      if (!bot) {
        throw new Error('can not find bot for WhatsApp')
      }
      this.puppetId = bot.wechaty.puppet.id
    }

    return this.puppetId
  }

  async execute (command: ForwardTextMessageToWhatsAppCommunityCommand) {
    this.log.verbose('ForwardTextMessageToWhatsAppCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

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

    if (sayable.type !== PUPPET.types.Sayable.Text) {
      return
    }

    sayable.payload.text = [
      signatureText,
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
