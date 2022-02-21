import type { Logger } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import type { WechatyRepository } from '../../../../wechaty-repository/mod.js'

import { ForwardTextMessageToGitterCommunityCommand } from '../mod.js'
import {
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                             from '../../queries/mod.js'
import { SendMessageCommand } from '../../../../friday-controller/commands/mod.js'
import type { GitterSettings } from '../../../../wechaty-repository/settings/mod.js'

@CommandHandler(ForwardTextMessageToGitterCommunityCommand)
export class ForwardTextMessageToGitterCommunityHandler implements ICommandHandler<ForwardTextMessageToGitterCommunityCommand> {

  private puppetId: string
  private roomId: string

  constructor (
    private readonly log: Logger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: WechatyRepository,
    settings: GitterSettings,
  ) {
    const wechaty = this.repository.find('Gitter')
    if (!wechaty) {
      throw new Error('no wechaty for Gitter')
    }

    this.puppetId = wechaty.puppet.id
    this.roomId = settings.wechatyRoomId
  }

  async execute (command: ForwardTextMessageToGitterCommunityCommand) {
    this.log.verbose('ForwardTextMessageToGitterCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

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

    await this.commandBus.execute(
      new SendMessageCommand(
        this.puppetId,
        this.roomId,
        sayable,
      ),
    )
  }

}
