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

    let channelName
    let talkerName

    try {
      const wechaty = await this.repository.findByPuppetId(query.puppetId)
      if (!wechaty) {
        throw new Error('no wechaty for puppetId: ' + query.puppetId)
      }

      const message = await wechaty.Message.find({ id: query.messageId })
      if (!message) {
        throw new Error('no message for messageId: ' + query.messageId)
      }

      channelName = wechaty.name()
      talkerName  = message.talker().name()
    } catch (e) {
      this.log.error('GetMessageSignatureHandler', 'execute() exception: %s', (e as Error).message)
      if (!channelName) {
        channelName = 'unknown'
      }
      if (!talkerName) {
        talkerName = 'unknown'
      }
    }

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
