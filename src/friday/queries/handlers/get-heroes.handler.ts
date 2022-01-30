import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import clc from 'cli-color'
import { BotRepository } from '../../repository/bot.repository.js'
import { GetHeroesQuery } from '../impl/index.js'

@QueryHandler(GetHeroesQuery)
export class GetHeroesHandler implements IQueryHandler<GetHeroesQuery> {

  constructor (private readonly repository: BotRepository) {}

  async execute (_query: GetHeroesQuery) {
    console.info(clc.yellowBright('Async GetHeroesQuery...'))
    return this.repository.findAll()
  }

}
