import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import type { Brolog } from 'brolog'

import { BotRepository } from '../../../bot-repository/mod.js'

import { GetMessageChannelNameQuery } from '../mod.js'

@QueryHandler(GetMessageChannelNameQuery)
export class GetMessageChannelNameHandler implements IQueryHandler<GetMessageChannelNameQuery> {

  constructor (
    private readonly log: Brolog,
    private readonly repository: BotRepository,
  ) {}

  async execute (query: GetMessageChannelNameQuery) {
    this.log.verbose('GetMessageChannelNameHandler', 'execute({puppetId: %s, messageId: %s})',
      query.puppetId,
      query.messageId,
    )

    const bot = await this.repository.findByPuppetId(query.puppetId)
    if (!bot) {
      return undefined
    }

    const channelName = bot.wechaty.name()
    return channelName
  }

}
