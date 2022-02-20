import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import type { OnModuleInit } from '@nestjs/common'
import type { Logger } from 'brolog'
import type { WechatyInterface } from 'wechaty/impls'

import type { BotRepository } from '../../../../wechaty-repository/mod.js'
import { GetGitterMembersCountQuery } from '../impls/mod.js'
import type { GitterSettings } from '../../../../wechaty-settings/mod.js'

@QueryHandler(GetGitterMembersCountQuery)
export class GetGitterMembersCountHandler implements IQueryHandler<GetGitterMembersCountQuery>, OnModuleInit {

  private wechaty?: WechatyInterface

  constructor (
    private readonly log: Logger,
    private readonly repository: BotRepository,
    private readonly gitterSettings: GitterSettings,
  ) {}

  async onModuleInit () {
    this.wechaty = await this.repository.find(this.gitterSettings.name)
  }

  async execute (_query: GetGitterMembersCountQuery) {
    const ids = await this.getGitterMemberIds()
    return ids.size
  }

  private async getGitterMemberIds (): Promise<Set<string>> {
    const gitterSet = new Set<string>()

    if (this.wechaty?.isLoggedIn) {
      const gitterRoom = await this.wechaty.Room.find({ id: this.gitterSettings.wechatyRoomId })
      if (gitterRoom) {
        const gitterRoomMemberList = await gitterRoom.memberAll()
        gitterRoomMemberList.forEach(contact => gitterSet.add(contact.id))
      }
      if (gitterSet.size <= 0) {
        this.log.error('CountingService', 'getGitterMemberIds() got 0 members')
      }
    } else {
      this.log.error('CountingService', 'getGitterMemberIds() bot is not logged in')
    }

    return gitterSet
  }

}
