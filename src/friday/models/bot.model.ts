import { AggregateRoot } from '@nestjs/cqrs'
import type { WechatyInterface } from 'wechaty/impls'
import type {
  Logger,
}           from 'brolog'

import { HeroFoundItemEvent } from '../events/impl/hero-found-item.event.js'
import { HeroKilledDragonEvent } from '../events/impl/hero-killed-dragon.event.js'

export class Bot extends AggregateRoot {

  log: Logger

  constructor (
    public readonly wechaty: WechatyInterface,
  ) {
    super()
    this.log = wechaty.log
  }

  killEnemy (enemyId: string) {
    // logic
    console.info('enemyId', enemyId)
    this.apply(new HeroKilledDragonEvent(this.id, enemyId))
  }

  addItem (itemId: string) {
    // logic
    this.apply(new HeroFoundItemEvent(this.id, itemId))
  }

}
