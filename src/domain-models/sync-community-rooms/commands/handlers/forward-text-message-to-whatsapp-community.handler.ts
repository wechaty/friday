import { Brolog } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import { WechatyRepository } from '../../../../wechaty-repository/mod.js'

import {
  ForwardTextMessageToWhatsAppCommunityCommand,
}                                               from '../mod.js'
import {
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                               from '../../queries/mod.js'

import { SendMessageCommand }   from '../../../../wechaty-events/mod.js'
import { WhatsAppSettings }     from '../../../../wechaty-settings/mod.js'

@CommandHandler(ForwardTextMessageToWhatsAppCommunityCommand)
export class ForwardTextMessageToWhatsAppCommunityHandler implements ICommandHandler<ForwardTextMessageToWhatsAppCommunityCommand> {

  constructor (
    private readonly log: Brolog,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: WechatyRepository,
    private readonly settings: WhatsAppSettings,
  ) {}

  async execute (command: ForwardTextMessageToWhatsAppCommunityCommand) {
    this.log.verbose('ForwardTextMessageToWhatsAppCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

    const wechaty = this.repository.find('WhatsApp')
    if (!wechaty) {
      this.log.warn('ForwardTextMessageToWhatsAppCommunityHandler', 'execute() no WhatsApp wechaty found')
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

    const puppetId = wechaty.puppet.id
    const roomId   = this.settings.wechatyRoomId

    await this.commandBus.execute(
      new SendMessageCommand(
        puppetId,
        roomId,
        sayable,
      ),
    )
  }

}
