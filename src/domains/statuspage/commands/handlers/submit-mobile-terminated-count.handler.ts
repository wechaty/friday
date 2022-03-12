import { Brolog } from 'brolog'
import {
  CommandHandler,
  ICommandHandler,
}                       from '@nestjs/cqrs'

import { SubmitMessagesMobileTerminatedCountCommand } from '../mod.js'

import { StatuspageService } from '../../statuspage.service.js'

@CommandHandler(SubmitMessagesMobileTerminatedCountCommand)
export class SubmitMobileTerminatedCountHandler implements ICommandHandler<SubmitMessagesMobileTerminatedCountCommand> {

  constructor (
    private readonly log: Brolog,
    private readonly statusPageApiService: StatuspageService,
  ) {}

  async execute (command: SubmitMessagesMobileTerminatedCountCommand) {
    this.log.verbose('SubmitReceivedMessagesCounterHandler', 'execute(%d)', command.counter)
    try {
      await this.statusPageApiService.submitMobileTerminatedMessageCount(command.counter)
    } catch (e) {
      this.log.error('SubmitReceivedMessagesCounterHandler', 'execute() submitMobileTerminatedMessageCount exception: %s', (e as Error).message)
    }
  }

}
