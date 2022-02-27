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

  private wechaty?: WechatyInterface
  private roomIdList: string[]

  constructor (
    private readonly log: Brolog,
    private readonly repository: WechatyRepository,
    private readonly weChatSettings: WeChatSettings,
  ) {
    this.roomIdList = [
      ...new Set([
        ...Object.values(weChatSettings.rooms.bot5Club).flat(),
        ...Object.values(weChatSettings.rooms.wechatyDevelopers).flat(),
        ...Object.values(weChatSettings.rooms.wechatyUserGroup).flat(),
      ]),
    ]
  }

  async onModuleInit () {
    this.wechaty = await this.repository.findByName(this.weChatSettings.name)

  }

  async execute (_query: GetWeChatMembersCountQuery) {
    // console.info(clc.greenBright('GetWeChatMembersCountQuery...'))
    this.log.verbose(clc.greenBright('GetWeChatMembersCount') + 'Handler', 'execute()')

    if (!this.wechaty?.isLoggedIn) {
      this.log.error('GetWeChatMembersCountHandler', 'getWeChatMemberIds() bot is not logged in yet')
      return
    }

    const roomList = await this.wechaty.Room.findAll({ topic: /Wechaty|BOT/i })
    const roomIdList = [
      ...this.roomIdList,
      ...roomList.map(room => room.id),
    ]

    const idSet = new Set<string>()

    for (const roomId of roomIdList) {
      const room = await this.wechaty.Room.find({ id: roomId })
      if (!room) {
        this.log.warn('GetWeChatMembersCountHandler', 'execute()', 'room not found:', roomId)
        continue
      }

      const memberList = await room.memberAll()
      memberList.forEach(contact =>
        idSet.add(contact.id),
      )
      // console.info('###', 'GetWeChatMembersCountQuery', await room.topic(), memberList.length)
    }

    if (idSet.size <= 0) {
      this.log.error('GetWeChatMembersCountHandler', 'getWeChatMemberIds() got 0 members')
    }

    // console.info('######## idSet.size', idSet.size)
    return idSet.size
  }

}
