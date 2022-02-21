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
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                             from '../../queries/mod.js'

import { SendMessageCommand } from '../../../../wechaty-events/mod.js'
import { GitterSettings }     from '../../../../wechaty-settings/mod.js'

import { ForwardMessageToGitterCommunityCommand } from '../impls/mod.js'

@CommandHandler(ForwardMessageToGitterCommunityCommand)
export class ForwardMessageToGitterCommunityHandler implements ICommandHandler<ForwardMessageToGitterCommunityCommand> {

  private puppetId: string
  private roomId: string

  constructor (
    private readonly log: Brolog,
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

  async execute (command: ForwardMessageToGitterCommunityCommand) {
    this.log.verbose('ForwardMessageToGitterCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

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
        'Markdown',
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
