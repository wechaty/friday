import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import type { Brolog } from 'brolog'

import { BotRepository } from '../../../bot-repository/mod.js'

import { GetMessageSignatureQuery } from '../mod.js'

@QueryHandler(GetMessageSignatureQuery)
export class GetMessageSignatureHandler implements IQueryHandler<GetMessageSignatureQuery> {

  constructor (
    private readonly log: Logger,
    private readonly repository: BotRepository,
  ) {}

  async execute (query: GetMessageSignatureQuery) {
    this.log.verbose('GetMessageSignatureHandler', 'execute({type:%s, puppetId:%s, messageId:%s})',
      query.type,
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

    const channelName = bot.wechaty.name()
    const talkerName  = message.talker().name()

    let signatureText: string

    if (query.type === 'markdown') {
      signatureText = [
        '`',
        talkerName,
        ' @ ',
        channelName,
        '`: ',
      ].join('')
    } else {
      signatureText = [
        '[',
        talkerName,
        ' @ ',
        channelName,
        ']: ',
      ].join('')
    }

    return signatureText
  }

}
