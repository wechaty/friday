import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Brolog } from 'brolog'
import * as PUPPET from 'wechaty-puppet'

import { WechatyRepository } from '../../../../wechaty-repository/mod.js'

import { IsMessageTypeTextQuery } from '../mod.js'

@QueryHandler(IsMessageTypeTextQuery)
export class IsMessageTypeTextHandler implements IQueryHandler<IsMessageTypeTextQuery> {

  constructor (
    private readonly log: Brolog,
    private readonly repository: WechatyRepository,
  ) {}

  async execute (query: IsMessageTypeTextQuery): Promise<boolean> {
    this.log.verbose('IsMessageTypeTextHandler', 'execute({puppetId: %s, messageId: %s})',
      query.puppetId,
      query.messageId,
    )

    const wechaty = await this.repository.findByPuppetId(query.puppetId)
    if (!wechaty) {
      throw new Error('puppetId not found: ' + query.puppetId)
    }

    const message = await wechaty.Message.find({ id: query.messageId })
    if (!message) {
      throw new Error('messageId not found: ' + query.messageId)
    }

    return message.type() === PUPPET.types.Message.Text
  }

}
