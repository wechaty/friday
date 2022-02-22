import { Brolog } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import { WechatyRepository } from '../../../../wechaty-repository/mod.js'

import { ForwardTextMessageToGitterCommunityCommand } from '../mod.js'
import {
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                             from '../../queries/mod.js'
import { SendMessageCommand } from '../../../../wechaty-events/mod.js'
import { GitterSettings } from '../../../../wechaty-settings/mod.js'

@CommandHandler(ForwardTextMessageToGitterCommunityCommand)
export class ForwardTextMessageToGitterCommunityHandler implements ICommandHandler<ForwardTextMessageToGitterCommunityCommand> {

  constructor (
    private readonly log: Brolog,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: WechatyRepository,
    private readonly settings: GitterSettings,
  ) {}

  async execute (command: ForwardTextMessageToGitterCommunityCommand) {
    this.log.verbose('ForwardTextMessageToGitterCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)
    const wechaty = this.repository.findByName('Gitter')
    if (!wechaty) {
      this.log.warn('ForwardTextMessageToGitterCommunityHandler', 'execute() no Gitter wechaty found')
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
        'Markdown',
        command.puppetId,
        command.messageId,
      ),
    )

    sayable.payload.text = [
      signature,
      sayable.payload.text,
    ].join('\n')

    const puppetId  = wechaty.puppet.id
    const roomId    = this.settings.wechatyRoomId

    await this.commandBus.execute(
      new SendMessageCommand(
        puppetId,
        roomId,
        sayable,
      ),
    )
  }

}
