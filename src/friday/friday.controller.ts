import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { KillDragonCommand } from './commands/impl/kill-dragon.command.js'
import type { KillDragonDto } from './interfaces/kill-dragon-dto.interface.js'
import type { Bot } from './models/bot.model.js'
import { GetHeroesQuery } from './queries/impl/index.js'

@Controller('bots')
export class HeroesGameController {

  constructor (
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post(':id/kill')
  async killDragon (
    @Param('id') id: string,
    @Body() dto: KillDragonDto,
  ) {
    console.info(dto)
    await this.commandBus.execute(new KillDragonCommand(id, dto.dragonId))
    return { id: 42 }
  }

  @Get()
  async findAll (): Promise<Bot[]> {
    return this.queryBus.execute(new GetHeroesQuery())
  }

}
