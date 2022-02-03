import { Brolog } from 'brolog'
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'

import {  SubmitSentMessagesCountCommand } from '../impls/submit-sent-messages-counter.command.js'
import type { StatusPageSettings } from '../../settings.js'

import { statusPageMetricSubmitter } from './status-page.api.js'

@CommandHandler(SubmitSentMessagesCountCommand)
export class SubmitSentMessagesCountHandler implements ICommandHandler<SubmitSentMessagesCountCommand> {

  submit: (value: number) => Promise<void>

  constructor (
    protected log: Brolog,
    protected settings: StatusPageSettings,
    protected readonly publisher: EventPublisher,
  ) {
    this.submit = statusPageMetricSubmitter(
      this.settings.apiKey,
      this.settings.pageId,
      this.settings.sentMessages,
    )
  }

  async execute (command: SubmitSentMessagesCountCommand) {
    this.log.verbose('SubmitSentMessagesCounterHandler', 'execute(%d)', command.counter)
    await this.submit(command.counter)
  }

}
