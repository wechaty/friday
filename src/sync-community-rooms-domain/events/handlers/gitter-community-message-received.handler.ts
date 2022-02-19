import {
  type IEventHandler,
  EventsHandler,
  CommandBus,
  QueryBus,
}                         from '@nestjs/cqrs'
import type { Logger }    from 'brolog'
import {
  ForwardMessageToQqCommunityCommand,
  ForwardTextMessageToQqCommunityCommand,
  ForwardMessageToWeChatCommunityCommand,
  ForwardTextMessageToWeChatCommunityCommand,
  ForwardMessageToWhatsAppCommunityCommand,
  ForwardTextMessageToWhatsAppCommunityCommand,
}                                               from '../../commands/mod.js'
import { IsMessageTypeTextQuery } from '../../queries/mod.js'

import {
  GitterCommunityMessageReceivedEvent,
}                                       from '../mod.js'

@EventsHandler(GitterCommunityMessageReceivedEvent)
export class GitterCommunityMessageReceivedHandler implements IEventHandler<GitterCommunityMessageReceivedEvent> {

  constructor (
    private readonly log: Logger,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async handle (event: GitterCommunityMessageReceivedEvent) {
    this.log.verbose('GitterCommunityMessageReceivedHandler', 'handle({puppetId: %s, messageId: %s})', event.puppetId, event.messageId)

    const commandClassList = []

    const isTypeText: boolean = await this.queryBus.execute(
      new IsMessageTypeTextQuery(
        event.puppetId,
        event.messageId,
      ),
    )

    if (isTypeText) {
      commandClassList.push(
        ForwardTextMessageToQqCommunityCommand,
        ForwardTextMessageToWeChatCommunityCommand,
        ForwardTextMessageToWhatsAppCommunityCommand,
      )
    } else {
      commandClassList.push(
        ForwardMessageToQqCommunityCommand,
        ForwardMessageToWeChatCommunityCommand,
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
