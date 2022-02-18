import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import type { Brolog } from 'brolog'
import * as WECHATY from 'wechaty'

import { BotRepository } from '../../../bot-repository/mod.js'

import { GetMessageSayablesQuery } from '../mod.js'

@QueryHandler(GetMessageSayablesQuery)
export class GetMessageSayablesHandler implements IQueryHandler<GetMessageSayablesQuery> {

  constructor (
    private readonly log: Brolog,
    private readonly repository: BotRepository,
  ) {}

  async execute (query: GetMessageSayablesQuery) {
    this.log.verbose('GetMessageSayablesHandler', 'execute({puppetId: %s, messageId: %s})',
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

    const payloads = await WECHATY.helpers.sayableToPayloads(sayable)
    return payloads
  }

}
