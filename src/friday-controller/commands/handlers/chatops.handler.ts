import {
  CommandHandler,
  ICommandHandler,
}                         from '@nestjs/cqrs'
import * as clc from 'cli-color'
import { WechatyRepository }  from '../../../wechaty-repository/mod.js'
import { ChatopsCommand } from '../impl/chatops.command.js'

@CommandHandler(ChatopsCommand)
export class ChatopsHandler implements ICommandHandler<ChatopsCommand> {

  constructor (
    private readonly repository: WechatyRepository,
  ) {}

  async execute (command: ChatopsCommand) {
    console.info(clc.greenBright('ChatopsCommand...'))

    const { roomId, text } = command
    const wechaty = await this.repository.find('WeChat')
    if (!wechaty) {
      console.error(clc.greenBright('ChatopsCommand... wechaty not found'))
      return
    }

    const room = await wechaty.Room.find({ id: roomId })
    if (room) {
      await room.say(text)
    }
  }

}
