import { Brolog } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import { WechatyRepository }  from '../../../../wechaty-repository/mod.js'
import { SendMessageCommand } from '../../../../wechaty-events/mod.js'
import { QqSettings }         from '../../../../wechaty-settings/mod.js'

import { ForwardMessageToQqCommunityCommand } from '../mod.js'
import {
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                             from '../../queries/mod.js'

@CommandHandler(ForwardMessageToQqCommunityCommand)
export class ForwardMessageToQqCommunityHandler implements ICommandHandler<ForwardMessageToQqCommunityCommand> {

  private puppetId: string
  private roomId: string

  constructor (
    private readonly log: Brolog,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: WechatyRepository,
    settings: QqSettings,
  ) {
    const wechaty = this.repository.find('QQ')
    if (!wechaty) {
      throw new Error('no wechaty for QQ')
    }

    this.puppetId = wechaty.puppet.id
    this.roomId = settings.wechatyRoomId
  }

  async execute (command: ForwardMessageToQqCommunityCommand) {
    this.log.verbose('ForwardMessageToQqCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)
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
