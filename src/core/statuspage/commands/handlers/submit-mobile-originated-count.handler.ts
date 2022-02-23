import { Brolog } from 'brolog'
import {
  CommandHandler,
  ICommandHandler,
}                     from '@nestjs/cqrs'

import {  SubmitMessagesMobileOriginatedCountCommand } from '../impls/mod.js'

import { StatuspageService } from '../../statuspage.service.js'

@CommandHandler(SubmitMessagesMobileOriginatedCountCommand)
export class SubmitMobileOriginatedCountHandler implements ICommandHandler<SubmitMessagesMobileOriginatedCountCommand> {

  constructor (
    private readonly log: Brolog,
    private readonly statuspageService: StatuspageService,
  ) {
  }

  async execute (command: SubmitMessagesMobileOriginatedCountCommand) {
    this.log.verbose('SubmitSentMessagesCounterHandler', 'execute(%d)', command.counter)
    try {
      await this.statuspageService.submitMobileOriginatedMessageCount(command.counter)
    } catch (e) {
      this.log.error('SubmitSentMessagesCounterHandler', 'execute() submitMobileOriginatedMessageCount exception: %s', (e as Error).message)
    }
  }

}
