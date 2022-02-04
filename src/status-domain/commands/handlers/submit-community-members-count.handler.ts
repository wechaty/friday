import { Brolog } from 'brolog'
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'

import { SubmitCommunityMembersCountCommand } from '../impls/submit-community-members-count.command.js'
import type { StatusPageSettings } from '../../settings.js'

import { statusPageMetricSubmitter } from '../libs/status-page.api.js'

@CommandHandler(SubmitCommunityMembersCountCommand)
export class SubmitCommunityMembersCounterHandler implements ICommandHandler<SubmitCommunityMembersCountCommand> {

  submit: (value: number) => Promise<void>

  constructor (
    protected log: Brolog,
    protected settings: StatusPageSettings,
    protected readonly publisher: EventPublisher,
  ) {
    this.submit = statusPageMetricSubmitter(
      this.settings.apiKey,
      this.settings.pageId,
      this.settings.members,
    )
  }

  async execute (command: SubmitCommunityMembersCountCommand) {
    this.log.verbose('SubmitCommunityMembersCounterHandler', 'execute(%d)', command.counter)
    await this.submit(command.counter)
  }

}
