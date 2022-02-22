import { Brolog } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import { WechatyRepository } from '../../../../wechaty-repository/mod.js'

import { ForwardMessageToWhatsAppCommunityCommand } from '../mod.js'
import {
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                               from '../../queries/mod.js'
import { SendMessageCommand } from '../../../../wechaty-events/mod.js'
import { WhatsAppSettings } from '../../../../wechaty-settings/mod.js'

@CommandHandler(ForwardMessageToWhatsAppCommunityCommand)
export class ForwardMessageToWhatsAppCommunityHandler implements ICommandHandler<ForwardMessageToWhatsAppCommunityCommand> {

  constructor (
    private readonly log: Brolog,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: WechatyRepository,
    private readonly settings: WhatsAppSettings,
  ) {}

  async execute (command: ForwardMessageToWhatsAppCommunityCommand) {
    this.log.verbose('ForwardMessageToWhatsAppCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

    const wechaty = this.repository.findByName('WhatsApp')
    if (!wechaty) {
      this.log.warn('ForwardMessageToWhatsAppCommunityHandler', 'execute() no WhatsApp wechaty found')
      return
    }

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

    const puppetId  = wechaty.puppet.id
    const roomId    = this.settings.wechatyRoomId

    await this.commandBus.execute(
      new SendMessageCommand(
        puppetId,
        roomId,
        PUPPET.payloads.sayable.text(signature),
      ),
    )
    await this.commandBus.execute(
      new SendMessageCommand(
        puppetId,
        roomId,
        sayable,
      ),
    )

  }

}
