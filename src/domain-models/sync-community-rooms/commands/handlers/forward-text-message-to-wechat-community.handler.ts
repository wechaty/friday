import type { Logger } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
}                   from '@nestjs/cqrs'
import * as PUPPET from 'wechaty-puppet'

import type { WechatyRepository } from '../../../../wechaty-repository/mod.js'

import {
  ForwardTextMessageToWeChatCommunityCommand,
}                                               from '../mod.js'
import {
  GetMessageSayableQuery,
  GetMessageSignatureQuery,
}                               from '../../queries/mod.js'

import { SendMessageCommand }   from '../../../../friday-controller/commands/mod.js'
import type { WeChatSettings }  from '../../../../wechaty-settings/mod.js'

@CommandHandler(ForwardTextMessageToWeChatCommunityCommand)
export class ForwardTextMessageToWeChatCommunityHandler implements ICommandHandler<ForwardTextMessageToWeChatCommunityCommand> {

  private puppetId: string

  private roomIdList: string[]

  constructor (
    private readonly log: Logger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly repository: WechatyRepository,
    settings: WeChatSettings,
  ) {
    const wechaty = this.repository.find('WeChat')
    if (!wechaty) {
      throw new Error('no bot for WeChat')
    }

    this.puppetId = wechaty.puppet.id

    this.roomIdList = [
      ...settings.rooms.wechatyDevelopers.home,
      ...settings.rooms.wechatyDevelopers.homeHq,
    ]
  }

  async execute (command: ForwardTextMessageToWeChatCommunityCommand) {
    this.log.verbose('ForwardTextMessageToWeChatCommunityHandler', 'execute({puppetId: %s, messageId: %s})', command.puppetId, command.messageId)

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

    for (const roomId of this.roomIdList) {
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
