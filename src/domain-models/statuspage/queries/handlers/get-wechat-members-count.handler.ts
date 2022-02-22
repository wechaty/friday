import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import clc from 'cli-color'
import { Brolog } from 'brolog'

import type { WechatyInterface } from 'wechaty/impls'

import { WechatyRepository }  from '../../../../wechaty-repository/mod.js'
import { WeChatSettings }     from '../../../../wechaty-settings/mod.js'

import { GetWeChatMembersCountQuery } from '../impls/mod.js'
import type { OnModuleInit } from '@nestjs/common'

@QueryHandler(GetWeChatMembersCountQuery)
export class GetWeChatMembersCountHandler implements IQueryHandler<GetWeChatMembersCountQuery>, OnModuleInit {

  protected wechaty?: WechatyInterface

  constructor (
    private readonly log: Brolog,
    private readonly repository: WechatyRepository,
    private readonly weChatSettings: WeChatSettings,
  ) {}

  async onModuleInit () {
    this.wechaty = await this.repository.findByName(this.weChatSettings.name)
  }

  async execute (_query: GetWeChatMembersCountQuery) {
    console.info(clc.yellowBright('Async GetWeChatMembersCountQuery...'))

    const topic = /Wechaty|BOT/i
    const idSet = new Set<string>()

    if (this.wechaty?.isLoggedIn) {
      const roomList = await this.wechaty.Room.findAll({ topic })
      for (const room of roomList) {
        const memberList = await room.memberAll()
        memberList.forEach(contact => idSet.add(contact.id))
      }
      if (idSet.size <= 0) {
        this.log.error('GetWeChatMembersCountHandler', 'getWeChatMemberIds() got 0 members')
      }
    } else {
      this.log.error('GetWeChatMembersCountHandler', 'getWeChatMemberIds() bot is not logged in yet')
    }

    return idSet.size
  }

}
