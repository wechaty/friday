import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import clc from 'cli-color'
import { BotRepository } from '../../../bot-repository/mod.js'
import { DropAncientItemCommand } from '../impl/drop-ancient-item.command.js'

@CommandHandler(DropAncientItemCommand)
export class DropAncientItemHandler
implements ICommandHandler<DropAncientItemCommand> {

  constructor (
    private readonly repository: BotRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute (command: DropAncientItemCommand) {
    console.info(clc.yellowBright('Async DropAncientItemCommand...'))

    const { heroId, itemId } = command
    const hero = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+heroId),
    )
    hero.addItem(itemId)
    hero.commit()
  }

}
