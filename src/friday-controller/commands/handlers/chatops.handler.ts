import type { Logger } from 'brolog'
import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
}                         from '@nestjs/cqrs'

import * as PUPPET from 'wechaty-puppet'

import { ChatopsCommand } from '../impls/chatops.command.js'
import { SendMessageCommand } from '../../../wechaty-events/commands/mod.js'
import type { WeChatSettings } from '../../../wechaty-repository/settings/mod.js'

@CommandHandler(ChatopsCommand)
export class ChatopsHandler implements ICommandHandler<ChatopsCommand> {

  constructor (
    private readonly log: Logger,
    private readonly commandBus: CommandBus,
    private readonly settings: WeChatSettings,
  ) {}

  async execute (command: ChatopsCommand) {
    this.log.verbose('ChatopsHandler', 'execute({roomId:%s, text:%s})',
      command.roomId,
      command.text,
    )

    await this.commandBus.execute(
      new SendMessageCommand(
        this.settings.rooms.chatops.friday,
        command.roomId,
        PUPPET.payloads.sayable.text(command.text),
      ),
    )
  }

}
