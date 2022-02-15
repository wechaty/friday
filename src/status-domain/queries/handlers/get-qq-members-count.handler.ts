import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Brolog } from 'brolog'

import type { WechatyInterface } from 'wechaty/impls'

import type { BotRepository } from '../../../bots/mod.js'
import { GetQqMembersCountQuery } from '../impl/mod.js'
import type { QqSettings } from '../../../bot-settings/mod.js'
import type { OnModuleInit } from '@nestjs/common'

@QueryHandler(GetQqMembersCountQuery)
export class GetQqMembersCountHandler implements IQueryHandler<GetQqMembersCountQuery>, OnModuleInit {

  protected qqBot?: WechatyInterface

  constructor (
    private readonly log: Brolog,
    private readonly repository: BotRepository,
    private readonly qqSettings: QqSettings,
  ) {}

  async onModuleInit () {
    const bot = await this.repository.find(this.qqSettings.name)
    this.qqBot = bot?.wechaty
  }

  async execute (_query: GetQqMembersCountQuery) {
    const ids = await this.getOicqMemberIds()
    return ids.size
  }

  protected async getOicqMemberIds (): Promise<Set<string>> {
    const topic = /Wechaty|BOT/i
    const qqSet = new Set<string>()

    if (this.qqBot?.isLoggedIn) {
      const roomList = await this.qqBot.Room.findAll({ topic })
      for (const room of roomList) {
        const memberList = await room.memberAll()
        memberList.forEach(contact => qqSet.add(contact.id))
      }
      if (qqSet.size <= 0) {
        this.log.error('GetOicqMembersCountHandler', 'getOicqMemberIds() got 0 members')
      }
    } else {
      this.log.error('GetOicqMembersCountHandler', 'getOicqMemberIds() bot is not logged in yet')
    }

    return qqSet
  }

}
