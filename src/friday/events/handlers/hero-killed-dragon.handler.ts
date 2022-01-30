import type { IEventHandler } from '@nestjs/cqrs'
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator.js'
import * as clc from 'cli-color'
import { HeroKilledDragonEvent } from '../impl/hero-killed-dragon.event.js'

@EventsHandler(HeroKilledDragonEvent)
export class HeroKilledDragonHandler
implements IEventHandler<HeroKilledDragonEvent> {

  handle (_event: HeroKilledDragonEvent) {
    console.info(clc.greenBright('HeroKilledDragonEvent...'))
  }

}
