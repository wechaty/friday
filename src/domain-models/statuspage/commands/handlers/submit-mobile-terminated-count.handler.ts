import { Brolog } from 'brolog'
import {
  CommandHandler,
  ICommandHandler,
}                       from '@nestjs/cqrs'

import { SubmitMessagesMobileTerminatedCountCommand } from '../mod.js'

import type { StatuspageApiService } from '../../statuspage-api.service.js'

@CommandHandler(SubmitMessagesMobileTerminatedCountCommand)
export class SubmitMobileTerminatedCountHandler implements ICommandHandler<SubmitMessagesMobileTerminatedCountCommand> {

  constructor (
    private readonly log: Brolog,
    private statusPageApiService: StatuspageApiService,
  ) {}

  async execute (command: SubmitMessagesMobileTerminatedCountCommand) {
    this.log.verbose('SubmitReceivedMessagesCounterHandler', 'execute(%d)', command.counter)
    await this.statusPageApiService.submitMobileTerminatedMessageCount(command.counter)
  }

}
