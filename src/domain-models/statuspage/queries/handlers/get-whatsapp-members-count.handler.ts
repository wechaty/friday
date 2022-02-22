import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import clc from 'cli-color'
import { Brolog } from 'brolog'

import type { WechatyInterface } from 'wechaty/impls'

import { WechatyRepository }  from '../../../../wechaty-repository/mod.js'
import { WhatsAppSettings }   from '../../../../wechaty-settings/mod.js'

import { GetWhatsAppMembersCountQuery } from '../impls/mod.js'
import type { OnModuleInit } from '@nestjs/common'

@QueryHandler(GetWhatsAppMembersCountQuery)
export class GetWhatsAppMembersCountHandler implements IQueryHandler<GetWhatsAppMembersCountQuery>, OnModuleInit {

  protected wechaty?: WechatyInterface

  constructor (
    private readonly log: Brolog,
    private readonly repository: WechatyRepository,
    private readonly whatsAppSettings: WhatsAppSettings,
  ) {}

  async onModuleInit () {
    this.wechaty = await this.repository.findByName(this.whatsAppSettings.name)
  }

  async execute (_query: GetWhatsAppMembersCountQuery) {
    console.info(clc.yellowBright('Async GetWhatsAppMembersCountQuery...'))

    const topic = /Wechaty|BOT/i
    const idSet = new Set<string>()

    if (this.wechaty?.isLoggedIn) {
      const roomList = await this.wechaty.Room.findAll({ topic })
      for (const room of roomList) {
        const memberList = await room.memberAll()
        memberList.forEach(contact => idSet.add(contact.id))
      }
      if (idSet.size <= 0) {
        this.log.error('GetWhatsAppMembersCountHandler', 'getWhatsAppMemberIds() got 0 members')
      }
    } else {
      this.log.error('GetWhatsAppMembersCountHandler', 'getWhatsAppMemberIds() bot is not logged in yet')
    }

    return idSet.size
  }

}
