import { Injectable } from '@nestjs/common'
import type { EventBus, QueryBus } from '@nestjs/cqrs'
import {
  Interval,
}                   from '@nestjs/schedule'
import { Brolog } from 'brolog'
import { CommunityDevelopersCountedEvent } from './events/impls/community-developers-counted.event'
import { GetGitterMembersCountQuery, GetOicqMembersCountQuery, GetWeChatMembersCountQuery, GetWhatsAppMembersCountQuery } from './queries/mod'

@Injectable()
export class CountingService {

  constructor (
    protected log: Brolog,
    protected eventBus: EventBus,
    protected queryBus: QueryBus,
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
      await this.queryBus.execute(new GetOicqMembersCountQuery()),
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
