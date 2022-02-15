import { Brolog } from 'brolog'
import { 
  CommandHandler, 
  ICommandHandler, 
}                     from '@nestjs/cqrs'

import {  SubmitMessagesMobileOriginatedCountCommand } from '../impls/submit-messages-mobile-originated-count.command.js'

import type { StatusPageApiService } from '../../status-page-api.service.js'

@CommandHandler(SubmitMessagesMobileOriginatedCountCommand)
export class SubmitMobileOriginatedCountHandler implements ICommandHandler<SubmitMessagesMobileOriginatedCountCommand> {

  constructor (
    private readonly log: Brolog,
    private statusPageApiService: StatusPageApiService,
  ) {
  }

  async execute (command: SubmitMessagesMobileOriginatedCountCommand) {
    this.log.verbose('SubmitSentMessagesCounterHandler', 'execute(%d)', command.counter)
    await this.statusPageApiService.submitMobileOriginatedMessageCount(command.counter)
  }

}
