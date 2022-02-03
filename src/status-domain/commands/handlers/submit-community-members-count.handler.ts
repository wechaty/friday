import { Brolog } from 'brolog'
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs'

import { SubmitCommunityMembersCounterCommand } from '../impls/submit-members-counter.command.js'
import type { StatusPageSettings } from '../../status-page.settings.js'

import { statusPageMetricSubmitter } from './status-page.api.js'

@CommandHandler(SubmitCommunityMembersCounterCommand)
export class SubmitCommunityMembersCounterHandler implements ICommandHandler<SubmitCommunityMembersCounterCommand> {

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

  async execute (command: SubmitCommunityMembersCounterCommand) {
    this.log.verbose('SubmitCommunityMembersCounterHandler', 'execute(%d)', command.counter)
    await this.submit(command.counter)
  }

}
