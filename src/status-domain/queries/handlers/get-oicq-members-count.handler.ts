import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Brolog } from 'brolog'

import type { WechatyInterface } from 'wechaty/impls'

import type { BotRepository } from '../../../cqrs/repositories/bot.repository.js'
import { GetOicqMembersCountQuery } from '../impl/mod.js'
import type { OicqSettings } from '../../../bot-settings/mod.js'
import type { OnModuleInit } from '@nestjs/common'

@QueryHandler(GetOicqMembersCountQuery)
export class GetOicqMembersCountHandler implements IQueryHandler<GetOicqMembersCountQuery>, OnModuleInit {

  protected oicqBot?: WechatyInterface

  constructor (
    protected log: Brolog,
    protected repository: BotRepository,
    protected oicqSettings: OicqSettings,
  ) {}

  async onModuleInit () {
    const bot = await this.repository.find(this.oicqSettings.name)
    this.oicqBot = bot?.wechaty
  }

  async execute (_query: GetOicqMembersCountQuery) {
    const ids = await this.getOicqMemberIds()
    return ids.size
  }

  protected async getOicqMemberIds (): Promise<Set<string>> {
    const topic = /Wechaty|BOT/i
    const oicqSet = new Set<string>()

    if (this.oicqBot?.isLoggedIn) {
      const roomList = await this.oicqBot.Room.findAll({ topic })
      for (const room of roomList) {
        const memberList = await room.memberAll()
        memberList.forEach(contact => oicqSet.add(contact.id))
      }
      if (oicqSet.size <= 0) {
        this.log.error('GetOicqMembersCountHandler', 'getOicqMemberIds() got 0 members')
      }
    } else {
      this.log.error('GetOicqMembersCountHandler', 'getOicqMemberIds() bot is not logged in yet')
    }

    return oicqSet
  }

}
