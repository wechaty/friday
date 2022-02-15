import { Brolog } from 'brolog'
import { 
  CommandHandler, 
  ICommandHandler,
}                       from '@nestjs/cqrs'

import { SubmitMessagesMobileTerminatedCountCommand } from '../mod.js'

import type { StatusPageApiService } from '../../status-page-api.service.js'

@CommandHandler(SubmitMessagesMobileTerminatedCountCommand)
export class SubmitReceivedMessagesCounterHandler implements ICommandHandler<SubmitMessagesMobileTerminatedCountCommand> {

  constructor (
    private log: Brolog,
    private statusPageApiService: StatusPageApiService,
  ) {}

  async execute (command: SubmitMessagesMobileTerminatedCountCommand) {
    this.log.verbose('SubmitReceivedMessagesCounterHandler', 'execute(%d)', command.counter)
    await this.statusPageApiService.submitMobileTerminatedMessageCount(command.counter)
  }

}
