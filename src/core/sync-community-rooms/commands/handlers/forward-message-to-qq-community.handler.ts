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

  constructor (
    private readonly log: Brolog,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: WechatyRepository,
    private readonly settings: QqSettings,
  ) {}

  async execute (command: ForwardMessageToQqCommunityCommand) {
    this.log.verbose('ForwardMessageToQqCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

    const wechaty = this.repository.findByName('QQ')
    if (!wechaty) {
      this.log.warn('ForwardMessageToQqCommunityHandler', 'execute() no QQ wechaty found')
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
    const roomId   = this.settings.wechatyRoomId

    switch (sayable.type) {
      case PUPPET.types.Sayable.Url: {
        break
      }

      case PUPPET.types.Sayable.Image: {
        /**
         * TODO: support image send api for Puppet Oicq
         *  @link https://github.com/wechaty/puppet-oicq/issues/27
         */
        break
      }

      default:
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

  }

}
