import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import clc from 'cli-color'
import { BotRepository } from '../../../bots/mod.js'
import { GetBotsQuery } from '../impl/mod.js'

@QueryHandler(GetBotsQuery)
export class GetBotsHandler implements IQueryHandler<GetBotsQuery> {

  constructor (
    private readonly repository: BotRepository,
  ) {}

  async execute (_query: GetBotsQuery) {
    console.info(clc.yellowBright('Async GetHeroesQuery...'))
    return this.repository.findAll()
  }

}
