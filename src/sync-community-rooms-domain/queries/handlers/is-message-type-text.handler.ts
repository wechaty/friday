import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import type { Brolog } from 'brolog'
import * as PUPPET from 'wechaty-puppet'

import { BotRepository } from '../../../bot-repository/mod.js'

import { IsMessageTypeTextQuery } from '../mod.js'

@QueryHandler(IsMessageTypeTextQuery)
export class IsMessageTypeTextHandler implements IQueryHandler<IsMessageTypeTextQuery> {

  constructor (
    private readonly log: Brolog,
    private readonly repository: BotRepository,
  ) {}

  async execute (query: IsMessageTypeTextQuery): Promise<boolean> {
    this.log.verbose('IsMessageTypeTextHandler', 'execute({puppetId: %s, messageId: %s})',
      query.puppetId,
      query.messageId,
    )

    const bot = await this.repository.findByPuppetId(query.puppetId)
    if (!bot) {
      throw new Error('puppetId not found: ' + query.puppetId)
    }

    const message = await bot.wechaty.Message.find({ id: query.messageId })
    if (!message) {
      throw new Error('messageId not found: ' + query.messageId)
    }

    return message.type() === PUPPET.types.Message.Text
  }

}
