import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import clc from 'cli-color'
import type { Logger } from 'brolog'

import type { WechatyInterface } from 'wechaty/impls'

import type { BotRepository } from '../../../wechaty-repository/mod.js.js'
import { GetWhatsAppMembersCountQuery } from '../impls/mod.js'
import type { WhatsAppSettings } from '../../../wechaty-settings/mod.js.js'
import type { OnModuleInit } from '@nestjs/common'

@QueryHandler(GetWhatsAppMembersCountQuery)
export class GetWhatsAppMembersCountHandler implements IQueryHandler<GetWhatsAppMembersCountQuery>, OnModuleInit {

  protected whatsAppBot?: WechatyInterface

  constructor (
    private readonly log: Logger,
    private readonly repository: BotRepository,
    private readonly whatsAppSettings: WhatsAppSettings,
  ) {}

  async onModuleInit () {
    const bot = await this.repository.find(this.whatsAppSettings.name)
    this.whatsAppBot = bot?.wechaty
  }

  async execute (_query: GetWhatsAppMembersCountQuery) {
    console.info(clc.yellowBright('Async GetHeroesQuery...'))
    const ids = await this.getWhatsAppMemberIds()
    return ids.size
  }

  protected async getWhatsAppMemberIds (): Promise<Set<string>> {
    const topic = /Wechaty|BOT/i
    const whatsAppSet = new Set<string>()

    if (this.whatsAppBot?.isLoggedIn) {
      const roomList = await this.whatsAppBot.Room.findAll({ topic })
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
