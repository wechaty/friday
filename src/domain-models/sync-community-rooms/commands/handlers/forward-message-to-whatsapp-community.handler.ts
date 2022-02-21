import type { Logger } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import type { WechatyRepository } from '../../../../wechaty-repository/mod.js'

import { ForwardMessageToWhatsAppCommunityCommand } from '../mod.js'
import {
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                               from '../../queries/mod.js'
import { SendMessageCommand } from '../../../../friday-controller/commands/mod.js'
import type { WhatsAppSettings } from '../../../../wechaty-repository/settings/mod.js'

@CommandHandler(ForwardMessageToWhatsAppCommunityCommand)
export class ForwardMessageToWhatsAppCommunityHandler implements ICommandHandler<ForwardMessageToWhatsAppCommunityCommand> {

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
      throw new Error('no wechaty for WhatsApp')
    }

    this.puppetId = wechaty.puppet.id
    this.roomId = settings.wechatyRoomId
  }

  async execute (command: ForwardMessageToWhatsAppCommunityCommand) {
    this.log.verbose('ForwardMessageToWhatsAppCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

    const sayable: undefined | PUPPET.payloads.Sayable = await this.queryBus.execute(
      new GetMessageSayableQuery(
        command.puppetId,
        command.messageId,
      ),
    )
    if (!sayable) {
      return
    }

    const signature: string = await this.queryBus.execute(
      new GetMessageSignatureQuery(
        'Plaintext',
        command.puppetId,
        command.messageId,
      ),
    )

    await this.commandBus.execute(
      new SendMessageCommand(
        this.puppetId,
        this.roomId,
        PUPPET.payloads.sayable.text(signature),
      ),
    )
    await this.commandBus.execute(
      new SendMessageCommand(
        this.puppetId,
        this.roomId,
        sayable,
      ),
    )

  }

}
