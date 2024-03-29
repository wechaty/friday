import {
  type IEventHandler,
  EventsHandler,
  CommandBus,
  QueryBus,
}                       from '@nestjs/cqrs'
import { Brolog }       from 'brolog'
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
  WorkProCommunityMessageReceivedEvent,
}                                       from '../mod.js'

@EventsHandler(WorkProCommunityMessageReceivedEvent)
export class WorkProCommunityMessageReceivedHandler implements IEventHandler<WorkProCommunityMessageReceivedEvent> {

  constructor (
    private readonly log: Brolog,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async handle (event: WorkProCommunityMessageReceivedEvent) {
    this.log.verbose('WorkProCommunityMessageReceivedHandler', 'handle({puppetId: %s, messageId: %s})', event.puppetId, event.messageId)

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
