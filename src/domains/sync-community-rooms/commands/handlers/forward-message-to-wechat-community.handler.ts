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
import { WeChatSettings }       from '../../../../wechaty-settings/mod.js'

import { ForwardMessageToWeChatCommunityCommand } from '../mod.js'
import {
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                               from '../../queries/mod.js'

@CommandHandler(ForwardMessageToWeChatCommunityCommand)
export class ForwardMessageToWeChatCommunityHandler implements ICommandHandler<ForwardMessageToWeChatCommunityCommand> {

  constructor (
    private readonly log: Brolog,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: WechatyRepository,
    private readonly settings: WeChatSettings,
  ) {}

  async execute (command: ForwardMessageToWeChatCommunityCommand) {
    this.log.verbose('ForwardMessageToWeChatCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

    const wechaty = this.repository.findByName('WeChat')
    if (!wechaty) {
      this.log.warn('ForwardMessageToWeChatCommunityHandler', 'execute() no WeChat wechaty found')
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
