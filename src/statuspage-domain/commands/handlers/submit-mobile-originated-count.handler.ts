import type { Logger } from 'brolog'
import {
  CommandHandler,
  ICommandHandler,
}                     from '@nestjs/cqrs'

import {  SubmitMessagesMobileOriginatedCountCommand } from '../impls/submit-messages-mobile-originated-count.command.js'

import type { StatuspageApiService } from '../../statuspage-api.service.js'

@CommandHandler(SubmitMessagesMobileOriginatedCountCommand)
export class SubmitMobileOriginatedCountHandler implements ICommandHandler<SubmitMessagesMobileOriginatedCountCommand> {

  constructor (
    private readonly log: Logger,
    private statusPageApiService: StatuspageApiService,
  ) {
  }

  async execute (command: SubmitMessagesMobileOriginatedCountCommand) {
    this.log.verbose('SubmitSentMessagesCounterHandler', 'execute(%d)', command.counter)
    await this.statusPageApiService.submitMobileOriginatedMessageCount(command.counter)
  }

}
