import type { IEventHandler } from '@nestjs/cqrs'
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator.js'
import * as clc from 'cli-color'
import { ChatopsEvent } from '../impl/chatops.event.js'

@EventsHandler(ChatopsEvent)
export class ChatopsHandler
implements IEventHandler<ChatopsEvent> {

  handle (_event: ChatopsEvent) {
    console.info(clc.greenBright('ChatopsEvent...'))
  }

}
