import { Brolog } from 'brolog'
import {
  CommandHandler,
  ICommandHandler,
}                     from '@nestjs/cqrs'

import {  SubmitMessagesMobileOriginatedCountCommand } from '../impls/mod.js'

import { StatuspageApiService } from '../../statuspage-api.service.js'

@CommandHandler(SubmitMessagesMobileOriginatedCountCommand)
export class SubmitMobileOriginatedCountHandler implements ICommandHandler<SubmitMessagesMobileOriginatedCountCommand> {

  constructor (
    private readonly log: Brolog,
    private readonly statusPageApiService: StatuspageApiService,
  ) {
  }

  async execute (command: SubmitMessagesMobileOriginatedCountCommand) {
    this.log.verbose('SubmitSentMessagesCounterHandler', 'execute(%d)', command.counter)
    await this.statusPageApiService.submitMobileOriginatedMessageCount(command.counter)
  }

}
