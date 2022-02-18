import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'
import * as clc from 'cli-color'
import { BotRepository } from '../../../bot-repository/mod.js'
import { KillDragonCommand } from '../impl/kill-dragon.command.js'

@CommandHandler(KillDragonCommand)
export class KillDragonHandler implements ICommandHandler<KillDragonCommand> {

  constructor (
    private readonly repository: BotRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute (command: KillDragonCommand) {
    console.info(clc.greenBright('KillDragonCommand...'))

    const { heroId, dragonId } = command
    const hero = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+heroId),
    )
    hero.killEnemy(dragonId)
    hero.commit()
  }

}
