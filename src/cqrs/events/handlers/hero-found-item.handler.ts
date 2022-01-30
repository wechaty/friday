import { EventsHandler, IEventHandler } from '@nestjs/cqrs'
import clc from 'cli-color'
import { HeroFoundItemEvent } from '../impl/hero-found-item.event.js'

@EventsHandler(HeroFoundItemEvent)
export class HeroFoundItemHandler implements IEventHandler<HeroFoundItemEvent> {

  handle (_event: HeroFoundItemEvent) {
    console.info(clc.yellowBright('Async HeroFoundItemEvent...'))
  }

}
