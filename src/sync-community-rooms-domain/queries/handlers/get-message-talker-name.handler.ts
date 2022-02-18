import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import type { Brolog } from 'brolog'

import { BotRepository } from '../../../bot-repository/mod.js'

import { GetMessageTalkerNameQuery } from '../mod.js'

@QueryHandler(GetMessageTalkerNameQuery)
export class GetMessageTalkerNameHandler implements IQueryHandler<GetMessageTalkerNameQuery> {

  constructor (
    private readonly log: Brolog,
    private readonly repository: BotRepository,
  ) {}

  async execute (query: GetMessageTalkerNameQuery) {
    this.log.verbose('GetMessageTalkerNameHandler', 'execute({puppetId: %s, messageId: %s})',
      query.puppetId,
      query.messageId,
    )

    const bot = await this.repository.findByPuppetId(query.puppetId)
    if (!bot) {
      return undefined
    }

    const message = await bot.wechaty.Message.find({ id: query.messageId })
    if (!message) {
      return undefined
    }

    const talkerName = message.talker().name()
    return talkerName
  }

}
