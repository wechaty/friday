import {
  type IEventHandler,
  EventsHandler,
  CommandBus,
  QueryBus,
}                         from '@nestjs/cqrs'
import type { Logger }    from 'brolog'
import {
  ForwardMessageToGitterCommunityCommand,
  ForwardMessageToQqCommunityCommand,
  ForwardMessageToWhatsAppCommunityCommand,
  ForwardTextMessageToGitterCommunityCommand,
  ForwardTextMessageToQqCommunityCommand,
  ForwardTextMessageToWhatsAppCommunityCommand,
}                                                   from '../../commands/mod.js'
import { IsMessageTypeTextQuery } from '../../queries/mod.js'

import {
  WeChatCommunityMessageReceivedEvent,
}                                       from '../mod.js'

@EventsHandler(WeChatCommunityMessageReceivedEvent)
export class WeChatCommunityMessageReceivedHandler implements IEventHandler<WeChatCommunityMessageReceivedEvent> {

  constructor (
    private readonly log: Logger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async handle (event: WeChatCommunityMessageReceivedEvent) {
    this.log.verbose('WeChatCommunityMessageReceivedHandler', 'handle({puppetId: %s, messageId: %s})', event.puppetId, event.messageId)

    const isTypeText: boolean = await this.queryBus.execute(
      new IsMessageTypeTextQuery(
        event.puppetId,
        event.messageId,
      ),
    )

    const commandClassList = []

    if (isTypeText) {
      commandClassList.push(
        ForwardTextMessageToGitterCommunityCommand,
        ForwardTextMessageToQqCommunityCommand,
        ForwardTextMessageToWhatsAppCommunityCommand,
      )
    } else {
      commandClassList.push(
        ForwardMessageToGitterCommunityCommand,
        ForwardMessageToQqCommunityCommand,
        ForwardMessageToWhatsAppCommunityCommand,
      )
    }

    /**
     * Bravo! the `commandClassList` has static typing for all types that pushed earlier!
     */
    commandClassList.map(Command =>
      this.commandBus.execute(
        new Command(
          event.puppetId,
          event.messageId,
        ),
      ),
    )
  }

}
