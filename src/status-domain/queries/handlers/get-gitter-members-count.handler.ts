import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import type { OnModuleInit } from '@nestjs/common'
import { Brolog } from 'brolog'
import type { WechatyInterface } from 'wechaty/impls'

import type { BotRepository } from '../../../bots/mod.js'
import { GetGitterMembersCountQuery } from '../impl/mod.js'
import type { GitterSettings } from '../../../bot-settings/mod.js'

@QueryHandler(GetGitterMembersCountQuery)
export class GetGitterMembersCountHandler implements IQueryHandler<GetGitterMembersCountQuery>, OnModuleInit {

  private gitterBot?: WechatyInterface

  constructor (
    private readonly log: Brolog,
    private readonly repository: BotRepository,
    private readonly gitterSettings: GitterSettings,
  ) {}

  async onModuleInit () {
    const bot = await this.repository.find(this.gitterSettings.name)
    this.gitterBot = bot?.wechaty
  }

  async execute (_query: GetGitterMembersCountQuery) {
    const ids = await this.getGitterMemberIds()
    return ids.size
  }

  private async getGitterMemberIds (): Promise<Set<string>> {
    const gitterSet = new Set<string>()

    if (this.gitterBot?.isLoggedIn) {
      const gitterRoom = await this.gitterBot.Room.find({ id: this.gitterSettings.wechatyRoomId })
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
