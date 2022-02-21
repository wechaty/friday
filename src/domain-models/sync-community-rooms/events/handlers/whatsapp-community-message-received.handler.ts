import {
  type IEventHandler,
  EventsHandler,
  CommandBus,
  QueryBus,
}                       from '@nestjs/cqrs'
import { Brolog }       from 'brolog'
import {
  ForwardMessageToGitterCommunityCommand,
  ForwardMessageToWeChatCommunityCommand,
  ForwardMessageToQqCommunityCommand,
  ForwardTextMessageToGitterCommunityCommand,
  ForwardTextMessageToWeChatCommunityCommand,
  ForwardTextMessageToQqCommunityCommand,
}                                                   from '../../commands/mod.js'
import { IsMessageTypeTextQuery } from '../../queries/mod.js'

import {
  WhatsAppCommunityMessageReceivedEvent,
}                                         from '../mod.js'

@EventsHandler(WhatsAppCommunityMessageReceivedEvent)
export class WhatsAppCommunityMessageReceivedHandler implements IEventHandler<WhatsAppCommunityMessageReceivedEvent> {

  constructor (
    private readonly log: Brolog,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async handle (event: WhatsAppCommunityMessageReceivedEvent) {
    this.log.verbose('WhatsAppCommunityMessageReceivedHandler', 'handle({puppetId: %s, messageId: %s})', event.puppetId, event.messageId)

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
        ForwardTextMessageToWeChatCommunityCommand,
        ForwardTextMessageToQqCommunityCommand,
      )
    } else {
      commandClassList.push(
        ForwardMessageToGitterCommunityCommand,
        ForwardMessageToWeChatCommunityCommand,
        ForwardMessageToQqCommunityCommand,
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
