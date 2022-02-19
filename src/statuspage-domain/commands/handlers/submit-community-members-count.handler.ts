import type { Logger } from 'brolog'
import {
  CommandHandler,
  ICommandHandler,
}                   from '@nestjs/cqrs'

import { SubmitCommunityMembersCountCommand } from '../impls/submit-community-members-count.command.js'

import type { StatuspageApiService } from '../../statuspage-api.service.js'

@CommandHandler(SubmitCommunityMembersCountCommand)
export class SubmitCommunityMembersCounterHandler implements ICommandHandler<SubmitCommunityMembersCountCommand> {

  constructor (
    private log: Logger,
    private statusPageApiService: StatuspageApiService,
  ) {}

  async execute (command: SubmitCommunityMembersCountCommand) {
    this.log.verbose('SubmitCommunityMembersCounterHandler', 'execute(%d)', command.counter)
    await this.statusPageApiService.submitCommunityMemberCount(command.counter)
  }

}
