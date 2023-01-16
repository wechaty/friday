import {
  type IEventHandler,
  EventsHandler,
  CommandBus,
  QueryBus,
}                         from '@nestjs/cqrs'
import { Brolog }         from 'brolog'
import {
  ForwardMessageToGitterCommunityCommand,
  ForwardMessageToWeChatCommunityCommand,
  ForwardMessageToWorkProCommunityCommand,
  ForwardMessageToWhatsAppCommunityCommand,
  ForwardTextMessageToGitterCommunityCommand,
  ForwardTextMessageToWeChatCommunityCommand,
  ForwardTextMessageToWorkProCommunityCommand,
  ForwardTextMessageToWhatsAppCommunityCommand,
}                                                   from '../../commands/mod.js'
import { IsMessageTypeTextQuery }                   from '../../queries/mod.js'

import {
  QqCommunityMessageReceivedEvent,
}                                       from '../mod.js'

@EventsHandler(QqCommunityMessageReceivedEvent)
export class QqCommunityMessageReceivedHandler implements IEventHandler<QqCommunityMessageReceivedEvent> {

  constructor (
    private readonly log: Brolog,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async handle (event: QqCommunityMessageReceivedEvent) {
    this.log.verbose('QqCommunityMessageReceivedHandler', 'handle({puppetId: %s, messageId: %s})', event.puppetId, event.messageId)

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
        ForwardTextMessageToWorkProCommunityCommand,
        ForwardTextMessageToWhatsAppCommunityCommand,
      )
    } else {
      commandClassList.push(
        ForwardMessageToGitterCommunityCommand,
        ForwardMessageToWeChatCommunityCommand,
        ForwardMessageToWorkProCommunityCommand,
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
