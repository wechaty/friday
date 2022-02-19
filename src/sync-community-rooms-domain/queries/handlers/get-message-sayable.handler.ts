import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import type { Logger } from 'brolog'
import * as WECHATY from 'wechaty'

import { BotRepository } from '../../../bot-repository/mod.js'

import { GetMessageSayableQuery } from '../mod.js'

@QueryHandler(GetMessageSayableQuery)
export class GetMessageSayableHandler implements IQueryHandler<GetMessageSayableQuery> {

  constructor (
    private readonly log: Logger,
    private readonly repository: BotRepository,
  ) {}

  async execute (query: GetMessageSayableQuery) {
    this.log.verbose('GetMessageSayableHandler', 'execute({puppetId: %s, messageId: %s})',
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

    const sayable = await WECHATY.helpers.messageToSayable(message)
    if (!sayable) {
      return undefined
    }

    const payload = await WECHATY.helpers.sayableToPayload(sayable)
    return payload
  }

}
