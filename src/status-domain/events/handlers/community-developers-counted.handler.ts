import type { IEventHandler } from '@nestjs/cqrs'
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator.js'
import * as clc from 'cli-color'
import { CommunityDevelopersCountedEvent } from '../impls/community-developers-counted.event.js'

@EventsHandler(CommunityDevelopersCountedEvent)
export class ChatopsHandler implements IEventHandler<CommunityDevelopersCountedEvent> {

  handle (_event: CommunityDevelopersCountedEvent) {
    console.info(clc.greenBright('CommunityDevelopersCountedEvent...'))
  }

}
