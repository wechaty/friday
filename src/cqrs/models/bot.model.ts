import { AggregateRoot } from '@nestjs/cqrs'
import type { WechatyInterface } from 'wechaty/impls'
import type {
  Logger,
}           from 'brolog'

import { HeroFoundItemEvent } from '../events/impl/hero-found-item.event.js'
import { ChatopsEvent } from '../events/impl/chatops.event.js'

export class Bot extends AggregateRoot {

  protected log: Logger

  constructor (
    public readonly wechaty: WechatyInterface,
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
