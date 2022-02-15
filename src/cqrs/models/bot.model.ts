import { AggregateRoot } from '@nestjs/cqrs'
import type * as PUPPET from 'wechaty-puppet'
import type * as WECHATY from 'wechaty'
import type {
  Logger,
}           from 'brolog'

import { HeroFoundItemEvent } from '../events/impl/hero-found-item.event.js'
import { ChatopsEvent } from '../events/impl/chatops.event.js'

export class Bot extends AggregateRoot {

  protected log: Logger

  constructor (
    public readonly wechaty: WECHATY.impls.WechatyInterface,
  ) {
    super()
    this.log = wechaty.log
  }

  async chatops (
    roomId: string,
    text: string,
  ) {
    // logic
    console.info('roomId/text', roomId, text)

    const room = await this.wechaty.Room.find({ id: roomId })
    if (room) {
      await room.say(text)
    }

    this.apply(
      new ChatopsEvent(this.wechaty.puppet.id, roomId, text),
    )
  }

  messageSend (...args: Parameters<PUPPET.impls.PuppetInterface['messageSend']>) {
    return this.wechaty.puppet.messageSend(...args)  
  }
  
  killEnemy (enemyId: string) {
    // logic
    console.info('enemyId', enemyId)
    this.apply(new ChatopsEvent(this.id, enemyId))
  }

  addItem (itemId: string) {
    // logic
    this.apply(new HeroFoundItemEvent(this.id, itemId))
  }

}
