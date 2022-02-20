import type { Logger } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import type { BotRepository } from '../../../wechaty-repository/mod.js'

import { ForwardMessageToWeChatCommunityCommand } from '../mod.js'
import {
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                               from '../../queries/mod.js'
import { SendMessageCommand } from '../../../cqrs/commands/mod.js'
import type { WeChatSettings } from '../../../wechaty-settings/mod.js'

@CommandHandler(ForwardMessageToWeChatCommunityCommand)
export class ForwardMessageToWeChatCommunityHandler implements ICommandHandler<ForwardMessageToWeChatCommunityCommand> {

  private puppetId: string

  private roomIdList: string[]

  constructor (
    private readonly log: Logger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: BotRepository,
    settings: WeChatSettings,
  ) {
    const wechaty = this.repository.find('WeChat')
    if (!wechaty) {
      throw new Error('no wechaty for WeChat')
    }

    this.puppetId = wechaty.puppet.id

    this.roomIdList = [
      ...settings.rooms.wechatyDevelopers.home,
      ...settings.rooms.wechatyDevelopers.homeHq,
    ]

  }

  async execute (command: ForwardMessageToWeChatCommunityCommand) {
    this.log.verbose('ForwardMessageToWeChatCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

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

    for (const roomId of this.roomIdList) {
      await this.commandBus.execute(
        new SendMessageCommand(
          this.puppetId,
          roomId,
          PUPPET.payloads.sayable.text(signature),
        ),
      )
      await this.commandBus.execute(
        new SendMessageCommand(
          this.puppetId,
          roomId,
          sayable,
        ),
      )
    }

  }

}
