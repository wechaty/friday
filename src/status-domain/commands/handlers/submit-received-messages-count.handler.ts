import { Brolog } from 'brolog'
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'

import { SubmitReceivedMessagesCountCommand } from '../impls/submit-received-messages-count.command.js'
import type { StatusPageSettings } from '../../status.settings.js'

import { statusPageMetricSubmitter } from '../libs/status-page.api.js'

@CommandHandler(SubmitReceivedMessagesCountCommand)
export class SubmitReceivedMessagesCounterHandler implements ICommandHandler<SubmitReceivedMessagesCountCommand> {

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

  async execute (command: SubmitReceivedMessagesCountCommand) {
    this.log.verbose('SubmitReceivedMessagesCounterHandler', 'execute(%d)', command.counter)
    await this.submit(command.counter)
  }

}
