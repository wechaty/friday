import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import * as clc from 'cli-color'
import { BotRepository } from '../../repository/bot.repository.js'
import { ChatopsCommand } from '../impl/chatops.command.js'

@CommandHandler(ChatopsCommand)
export class ChatopsHandler implements ICommandHandler<ChatopsCommand> {

  constructor (
    private readonly repository: BotRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute (command: ChatopsCommand) {
    console.info(clc.greenBright('ChatopsCommand...'))

    const { roomId, text } = command
    const bot = await this.repository.find('friday@wechat')
    if (!bot) {
      console.error(clc.greenBright('ChatopsCommand... bot not found'))
      return
    }

    const bot2 = this.publisher.mergeObjectContext(
      bot,
    )
    await bot2.chatops(roomId, text)
    bot2.commit()
  }

}
