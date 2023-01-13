import {
  IQueryHandler,
  QueryHandler,
}                   from '@nestjs/cqrs'
import { Brolog }   from 'brolog'
import clc          from 'cli-color'

import type { WechatyInterface } from 'wechaty/impls'

import { WechatyRepository }  from '../../../../wechaty-repository/mod.js'
import { QqSettings }         from '../../../../wechaty-settings/mod.js'

import { GetQqMembersCountQuery } from '../impls/mod.js'
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
    this.wechaty = await this.repository.findByName(this.qqSettings.name)
  }

  async execute (_query: GetQqMembersCountQuery) {
    this.log.verbose(clc.greenBright('GetQqMembersCount') + 'Handler', 'execute()')

    const topic = /Wechaty|BOT/i
    const idSet = new Set<string>()

    if (this.wechaty?.isLoggedIn) {
      const roomList = await this.wechaty.Room.findAll({ topic })
      for (const room of roomList) {
        const memberList = await room.memberAll()
        memberList.forEach(contact => idSet.add(contact.id))
      }
      this.log.verbose('GetQqMembersCountHandler', 'getQqMemberIds() got %d members', idSet.size)
    } else {
      this.log.error('GetQqMembersCountHandler', 'getQqMemberIds() bot is not logged in yet')
    }

    return idSet.size
  }

}
