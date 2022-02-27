import { Injectable } from '@nestjs/common'
import {
  EventBus,
  QueryBus,
}                     from '@nestjs/cqrs'
import {
  Interval,
}                     from '@nestjs/schedule'
import { Brolog }     from 'brolog'

import {
  CommunityDevelopersCountedEvent,
}                                   from './events/mod.js'
import {
  GetGitterMembersCountQuery,
  GetQqMembersCountQuery,
  GetWeChatMembersCountQuery,
  GetWhatsAppMembersCountQuery,
}                                   from './queries/mod.js'

@Injectable()
export class CountingService {

  constructor (
    private readonly eventBus : EventBus,
    private readonly log      : Brolog,
    private readonly queryBus : QueryBus,
  ) {}

  /**
   * Task Scheduling
   *  @link https://docs.nestjs.com/techniques/task-scheduling
   */
  // @Cron(CronExpression.EVERY_MINUTE, {
  //   name: 'countCommunityDevelopers',
  // })
  @Interval('countCommunityDevelopers', 60 * 1000)
  protected async countCommunityDevelopers (): Promise<void> {
    this.log.verbose('CountingService', 'countCommunityDevelopers()')

    const countList: number[] = [
      await this.queryBus.execute(new GetQqMembersCountQuery()),
      await this.queryBus.execute(new GetWeChatMembersCountQuery()),
      await this.queryBus.execute(new GetGitterMembersCountQuery()),
      await this.queryBus.execute(new GetWhatsAppMembersCountQuery()),
    ]

    const finalCount = countList.reduce((acc, cur) => acc + cur, 0)

    this.eventBus.publish(
      new CommunityDevelopersCountedEvent(finalCount),
    )
  }

}
