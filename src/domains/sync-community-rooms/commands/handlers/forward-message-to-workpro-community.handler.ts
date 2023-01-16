import { Brolog } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import { WechatyRepository }    from '../../../../wechaty-repository/mod.js'
import { SendMessageCommand }   from '../../../../wechaty-events/mod.js'
import { WorkProSettings }       from '../../../../wechaty-settings/mod.js'

import { ForwardMessageToWorkProCommunityCommand } from '../mod.js'
import {
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                               from '../../queries/mod.js'

@CommandHandler(ForwardMessageToWorkProCommunityCommand)
export class ForwardMessageToWorkProCommunityHandler implements ICommandHandler<ForwardMessageToWorkProCommunityCommand> {

  constructor (
    private readonly log: Brolog,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: WechatyRepository,
    private readonly settings: WorkProSettings,
  ) {}

  async execute (command: ForwardMessageToWorkProCommunityCommand) {
    this.log.verbose('ForwardMessageToWorkProCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

    const wechaty = this.repository.findByName('WorkPro')
    if (!wechaty) {
      this.log.warn('ForwardMessageToWorkProCommunityHandler', 'execute() no WorkPro wechaty found')
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

    const puppetId = wechaty.puppet.id
    const roomIdList = [
      ...this.settings.rooms.wechatyDevelopers.home,
      ...this.settings.rooms.wechatyDevelopers.homeHq,
    ]

    for (const roomId of roomIdList) {
      await this.commandBus.execute(
        new SendMessageCommand(
          puppetId,
          roomId,
          PUPPET.payloads.sayable.text(signature + ' : '),
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

}
