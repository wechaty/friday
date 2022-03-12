import {
  IQueryHandler,
  QueryHandler,
}                         from '@nestjs/cqrs'
import { Brolog }         from 'brolog'
import * as WECHATY       from 'wechaty'
import type * as PUPPET   from 'wechaty-puppet'

import { WechatyRepository } from '../../../../wechaty-repository/mod.js'

import { GetMessageSayableQuery } from '../mod.js'

@QueryHandler(GetMessageSayableQuery)
export class GetMessageSayableHandler implements IQueryHandler<GetMessageSayableQuery> {

  constructor (
    private readonly log: Brolog,
    private readonly repository: WechatyRepository,
  ) {}

  async execute (query: GetMessageSayableQuery): Promise<undefined | PUPPET.payloads.Sayable> {
    this.log.verbose('GetMessageSayableHandler', 'execute({puppetId: %s, messageId: %s})',
      query.puppetId,
      query.messageId,
    )

    const wechaty = await this.repository.findByPuppetId(query.puppetId)
    if (!wechaty) {
      this.log.warn('GetMessageSayableHandler', 'execute() no wechaty found for puppetId: %s', query.puppetId)
      return undefined
    }

    const message = await wechaty.Message.find({ id: query.messageId })
    if (!message) {
      this.log.warn('GetMessageSayableHandler', 'execute() no message found for messageId: %s', query.messageId)
      return undefined
    }

    const sayable = await WECHATY.helpers.messageToSayable(message)
    if (!sayable) {
      this.log.warn('GetMessageSayableHandler', 'execute() no sayable found for messageId: %s', query.messageId)
      return undefined
    }

    const payload = await WECHATY.helpers.sayableToPayload(sayable)
    return payload
  }

}
