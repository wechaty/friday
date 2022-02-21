import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { Brolog } from 'brolog'

import type { WechatyInterface } from 'wechaty/impls'

import type { WechatyRepository } from '../../../../wechaty-repository/mod.js'
import { GetQqMembersCountQuery } from '../impls/mod.js'
import type { QqSettings } from '../../../../wechaty-settings/mod.js'
import type { OnModuleInit } from '@nestjs/common'

@QueryHandler(GetQqMembersCountQuery)
export class GetQqMembersCountHandler implements IQueryHandler<GetQqMembersCountQuery>, OnModuleInit {

  protected wechaty?: WechatyInterface

  constructor (
    private readonly log: Brolog,
    private readonly repository: WechatyRepository,
    private readonly qqSettings: QqSettings,
  ) {}

  async onModuleInit () {
    this.wechaty = await this.repository.find(this.qqSettings.name)
  }

  async execute (_query: GetQqMembersCountQuery) {
    const ids = await this.getOicqMemberIds()
    return ids.size
  }

  protected async getOicqMemberIds (): Promise<Set<string>> {
    const topic = /Wechaty|BOT/i
    const qqSet = new Set<string>()

    if (this.wechaty?.isLoggedIn) {
      const roomList = await this.wechaty.Room.findAll({ topic })
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
