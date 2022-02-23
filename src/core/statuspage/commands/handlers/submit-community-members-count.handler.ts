import { Brolog } from 'brolog'
import {
  CommandHandler,
  ICommandHandler,
}                   from '@nestjs/cqrs'

import { SubmitCommunityMembersCountCommand } from '../impls/mod.js'

import { StatuspageService } from '../../statuspage.service.js'

@CommandHandler(SubmitCommunityMembersCountCommand)
export class SubmitCommunityMembersCounterHandler implements ICommandHandler<SubmitCommunityMembersCountCommand> {

  constructor (
    private readonly log: Brolog,
    private readonly statuspageService: StatuspageService,
  ) {}

  async execute (command: SubmitCommunityMembersCountCommand) {
    this.log.verbose('SubmitCommunityMembersCounterHandler', 'execute(%d)', command.counter)
    try {
      await this.statuspageService.submitCommunityMemberCount(command.counter)
    } catch (e) {
      this.log.error('SubmitCommunityMembersCounterHandler', 'execute() submitCommunityMemberCount exception: %s', (e as Error).message)
    }
  }

}
