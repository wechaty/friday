import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Brolog } from 'brolog'

import { WechatyRepository } from '../../../../wechaty-repository/mod.js'

import { GetMessageSignatureQuery } from '../mod.js'

@QueryHandler(GetMessageSignatureQuery)
export class GetMessageSignatureHandler implements IQueryHandler<GetMessageSignatureQuery> {

  constructor (
    private readonly log: Brolog,
    private readonly repository: WechatyRepository,
  ) {}

  async execute (query: GetMessageSignatureQuery) {
    this.log.verbose('GetMessageSignatureHandler', 'execute({type:%s, puppetId:%s, messageId:%s})',
      query.type,
      query.puppetId,
      query.messageId,
    )

    const wechaty = await this.repository.findByPuppetId(query.puppetId)
    if (!wechaty) {
      return undefined
    }

    const message = await wechaty.Message.find({ id: query.messageId })
    if (!message) {
      return undefined
    }

    const channelName = wechaty.name()
    const talkerName  = message.talker().name()

    let signatureText: string

    if (query.type === 'Markdown') {
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
