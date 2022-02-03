import { Brolog } from 'brolog'
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'

import { SubmitReceivedMessagesCounterCommand } from '../impls/submit-received-messages-counter.command.js'
import type { StatusPageSettings } from '../../status-page.settings.js'

import { statusPageMetricSubmitter } from './status-page.api.js'

@CommandHandler(SubmitReceivedMessagesCounterCommand)
export class SubmitReceivedMessagesCounterHandler implements ICommandHandler<SubmitReceivedMessagesCounterCommand> {

  submit: (value: number) => Promise<void>

  constructor (
    protected log: Brolog,
    protected settings: StatusPageSettings,
    protected readonly publisher: EventPublisher,
  ) {
    this.submit = statusPageMetricSubmitter(
      this.settings.apiKey,
      this.settings.pageId,
      this.settings.receivedMessages,
    )
  }

  async execute (command: SubmitReceivedMessagesCounterCommand) {
    this.log.verbose('SubmitReceivedMessagesCounterHandler', 'execute(%d)', command.counter)
    await this.submit(command.counter)
  }

}
