import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import clc from 'cli-color'
import { Brolog } from 'brolog'

import type { WechatyInterface } from 'wechaty/impls'

import { WechatyRepository }  from '../../../../wechaty-repository/mod.js'
import { WorkProSettings }     from '../../../../wechaty-settings/mod.js'

import { GetWorkProMembersCountQuery } from '../impls/mod.js'
import type { OnModuleInit } from '@nestjs/common'

@QueryHandler(GetWorkProMembersCountQuery)
export class GetWorkProMembersCountHandler implements IQueryHandler<GetWorkProMembersCountQuery>, OnModuleInit {

  private wechaty?: WechatyInterface
  private roomIdList: string[]

  constructor (
    private readonly log: Brolog,
    private readonly repository: WechatyRepository,
    private readonly workProSettings: WorkProSettings,
  ) {
    this.roomIdList = [
      ...new Set([
        ...Object.values(workProSettings.rooms.bot5Club).flat(),
        ...Object.values(workProSettings.rooms.wechatyDevelopers).flat(),
        ...Object.values(workProSettings.rooms.polyglotUserGroup).flat(),
      ]),
    ]
  }

  async onModuleInit () {
    this.wechaty = await this.repository.findByName(this.workProSettings.name)

  }

  async execute (_query: GetWorkProMembersCountQuery): Promise<number> {
    // console.info(clc.greenBright('GetWorkProMembersCountQuery...'))
    this.log.verbose(clc.greenBright('GetWorkProMembersCount') + 'Handler', 'execute()')

    if (!this.wechaty?.isLoggedIn) {
      this.log.error('GetWorkProMembersCountHandler', 'getWorkProMemberIds() bot is not logged in yet')
      return 0
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
        this.log.warn('GetWorkProMembersCountHandler', 'execute()', 'room not found:', roomId)
        continue
      }

      const memberList = await room.memberAll()
      memberList.forEach(contact =>
        idSet.add(contact.id),
      )
      // console.info('###', 'GetWorkProMembersCountQuery', await room.topic(), memberList.length)
    }

    if (idSet.size <= 0) {
      this.log.error('GetWorkProMembersCountHandler', 'getWorkProMemberIds() got 0 members')
    }

    // console.info('######## idSet.size', idSet.size)
    return idSet.size
  }

}
