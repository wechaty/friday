import {
  IQueryHandler,
  QueryHandler,
}                                 from '@nestjs/cqrs'
import clc                        from 'cli-color'
import type { OnModuleInit }      from '@nestjs/common'
import { Brolog }                 from 'brolog'
import type { WechatyInterface }  from 'wechaty/impls'

import { WechatyRepository } from '../../../../wechaty-repository/mod.js'
import { GetGitterMembersCountQuery } from '../impls/mod.js'
import { GitterSettings } from '../../../../wechaty-settings/mod.js'

@QueryHandler(GetGitterMembersCountQuery)
export class GetGitterMembersCountHandler implements IQueryHandler<GetGitterMembersCountQuery>, OnModuleInit {

  private wechaty?: WechatyInterface

  constructor (
    private readonly log: Brolog,
    private readonly repository: WechatyRepository,
    private readonly gitterSettings: GitterSettings,
  ) {}

  async onModuleInit () {
    this.wechaty = await this.repository.findByName(this.gitterSettings.name)
  }

  async execute (_query: GetGitterMembersCountQuery) {
    this.log.verbose(clc.greenBright('GetGitterMembersCount') + 'Handler', 'execute()')

    const idSet = new Set<string>()

    if (this.wechaty?.isLoggedIn) {
      const gitterRoom = await this.wechaty.Room.find({ id: this.gitterSettings.wechatyRoomId })
      if (gitterRoom) {
        const gitterRoomMemberList = await gitterRoom.memberAll()
        gitterRoomMemberList.forEach(contact => idSet.add(contact.id))
      }
      this.log.verbose('GetGitterMembersCountHandler', 'getGitterMemberIds() got %d members', idSet.size)
    } else {
      this.log.error('GetGitterMembersCountHandler', 'getGitterMemberIds() bot is not logged in')
    }

    return idSet.size
  }

}
