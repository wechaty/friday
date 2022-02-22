import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import clc from 'cli-color'
import { Brolog } from 'brolog'

import type { WechatyInterface } from 'wechaty/impls'

import type { WechatyRepository } from '../../../../wechaty-repository/mod.js'
import { GetWhatsAppMembersCountQuery } from '../impls/mod.js'
import type { WhatsAppSettings } from '../../../../wechaty-settings/mod.js'
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
    console.info(clc.yellowBright('Async GetHeroesQuery...'))
    const ids = await this.getWhatsAppMemberIds()
    return ids.size
  }

  protected async getWhatsAppMemberIds (): Promise<Set<string>> {
    const topic = /Wechaty|BOT/i
    const whatsAppSet = new Set<string>()

    if (this.wechaty?.isLoggedIn) {
      const roomList = await this.wechaty.Room.findAll({ topic })
      for (const room of roomList) {
        const memberList = await room.memberAll()
        memberList.forEach(contact => whatsAppSet.add(contact.id))
      }
      if (whatsAppSet.size <= 0) {
        this.log.error('GetWhatsAppMembersCountHandler', 'getWhatsAppMemberIds() got 0 members')
      }
    } else {
      this.log.error('GetWhatsAppMembersCountHandler', 'getWhatsAppMemberIds() bot is not logged in yet')
    }

    return whatsAppSet
  }

}
