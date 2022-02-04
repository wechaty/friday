import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import clc from 'cli-color'
import { Brolog } from 'brolog'

import type { WechatyInterface } from 'wechaty/impls'

import type { BotRepository } from '../../../bots/mod.js'
import { GetWhatsAppMembersCountQuery } from '../impl/mod.js'
import type { WhatsAppSettings } from '../../../bot-settings/mod.js'
import type { OnModuleInit } from '@nestjs/common'

@QueryHandler(GetWhatsAppMembersCountQuery)
export class GetWhatsAppMembersCountHandler implements IQueryHandler<GetWhatsAppMembersCountQuery>, OnModuleInit {

  protected whatsAppBot?: WechatyInterface

  constructor (
    private readonly log: Brolog,
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
