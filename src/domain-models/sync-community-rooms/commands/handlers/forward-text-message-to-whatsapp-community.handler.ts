import type { Logger } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import type { WechatyRepository } from '../../../../wechaty-repository/mod.js'

import {
  ForwardTextMessageToWhatsAppCommunityCommand,
}                                               from '../mod.js'
import {
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                                 from '../../queries/mod.js'

import { SendMessageCommand }     from '../../../../friday-controller/commands/mod.js'
import type { WhatsAppSettings }  from '../../../../wechaty-settings/mod.js'

@CommandHandler(ForwardTextMessageToWhatsAppCommunityCommand)
export class ForwardTextMessageToWhatsAppCommunityHandler implements ICommandHandler<ForwardTextMessageToWhatsAppCommunityCommand> {

  private puppetId: string
  private roomId: string

  constructor (
    private readonly log: Logger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: WechatyRepository,
    settings: WhatsAppSettings,
  ) {
    const wechaty = this.repository.find('WhatsApp')
    if (!wechaty) {
      throw new Error('no bot for WhatsApp')
    }

    this.puppetId = wechaty.puppet.id

    this.roomId = settings.wechatyRoomId
  }

  async execute (command: ForwardTextMessageToWhatsAppCommunityCommand) {
    this.log.verbose('ForwardTextMessageToWhatsAppCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

    const sayable: undefined | PUPPET.payloads.Sayable = await this.queryBus.execute(
      new GetMessageSayableQuery(
        command.puppetId,
        command.messageId,
      ),
    )
    if (!sayable) {
      return
    }

    if (sayable.type !== PUPPET.types.Sayable.Text) {
      return
    }

    const signature: string = await this.queryBus.execute(
      new GetMessageSignatureQuery(
        'Plaintext',
        command.puppetId,
        command.messageId,
      ),
    )

    sayable.payload.text = [
      signature,
      sayable.payload.text,
    ].join('\n')

    await this.commandBus.execute(
      new SendMessageCommand(
        this.puppetId,
        this.roomId,
        sayable,
      ),
    )
  }

}