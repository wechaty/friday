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

  constructor (
    private readonly log: Brolog,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: WechatyRepository,
    private readonly settings: GitterSettings,
  ) {}

  async execute (command: ForwardMessageToGitterCommunityCommand) {
    this.log.verbose('ForwardMessageToGitterCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

    const wechaty = this.repository.findByName('Gitter')
    if (!wechaty) {
      this.log.warn('ForwardMessageToGitterCommunityHandler', 'execute() no Gitter wechaty found')
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
        'Markdown',
        command.puppetId,
        command.messageId,
      ),
    )

    const puppetId  = wechaty.puppet.id
    const roomId    = this.settings.wechatyRoomId

    switch (sayable.type) {
      case PUPPET.types.Sayable.Url: {
        const text = [
          signature,
          ' : ',
          sayable.payload.url,
          ' - ',
          sayable.payload.title,
        ].join('')

        await this.commandBus.execute(
          new SendMessageCommand(
            puppetId,
            roomId,
            PUPPET.payloads.sayable.text(text),
          ),
        )

        break
      }

      case PUPPET.types.Sayable.Image: {
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

        break
      }

      default:
        this.log.silly('ForwardMessageToGitterCommunityHandler', 'execute() skip non-image & non-url message: %s', sayable.type)
    }

  }

}
