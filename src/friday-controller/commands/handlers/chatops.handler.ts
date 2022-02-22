import { Brolog } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
}                         from '@nestjs/cqrs'

import * as PUPPET from 'wechaty-puppet'

import { SendMessageCommand } from '../../../wechaty-events/mod.js'
import { WeChatSettings }     from '../../../wechaty-settings/mod.js'
import { WechatyRepository }  from '../../../wechaty-repository/mod.js'

import { ChatopsCommand } from '../impls/chatops.command.js'

@CommandHandler(ChatopsCommand)
export class ChatopsHandler implements ICommandHandler<ChatopsCommand> {

  constructor (
    private readonly log: Brolog,
    private readonly commandBus: CommandBus,
    private readonly settings: WeChatSettings,
    private readonly repository: WechatyRepository,
  ) {}

  async execute (command: ChatopsCommand) {
    this.log.verbose('ChatopsHandler', 'execute({roomId:%s, text:%s})',
      command.roomId,
      command.text,
    )

    const wechaty = this.repository.findByName('WeChat')
    if (!wechaty) {
      this.log.warn('ChatopsHandler', 'execute() no wechaty found')
      return
    }

    const puppetId = wechaty.puppet.id
    const roomId = this.settings.rooms.chatops.friday

    await this.commandBus.execute(
      new SendMessageCommand(
        puppetId,
        roomId,
        PUPPET.payloads.sayable.text(command.text),
      ),
    )
  }

}
