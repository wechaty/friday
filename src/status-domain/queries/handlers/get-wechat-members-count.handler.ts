import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import clc from 'cli-color'
import { Brolog } from 'brolog'

import type { WechatyInterface } from 'wechaty/impls'

import type { BotRepository } from '../../../cqrs/repositories/bot.repository.js'
import { GetWeChatMembersCountQuery } from '../impl/mod.js'
import type { WeChatSettings } from '../../../bot-settings/mod.js'
import type { OnModuleInit } from '@nestjs/common'

@QueryHandler(GetWeChatMembersCountQuery)
export class GetWeChatMembersCountHandler implements IQueryHandler<GetWeChatMembersCountQuery>, OnModuleInit {

  protected weChatBot?: WechatyInterface

  constructor (
    protected log: Brolog,
    protected repository: BotRepository,
    protected weChatSettings: WeChatSettings,
  ) {}

  async onModuleInit () {
    const bot = await this.repository.find(this.weChatSettings.name)
    this.weChatBot = bot?.wechaty
  }

  async execute (_query: GetWeChatMembersCountQuery) {
    console.info(clc.yellowBright('Async GetHeroesQuery...'))
    const ids = await this.getWeChatMemberIds()
    return ids.size
  }

  protected async getWeChatMemberIds (): Promise<Set<string>> {
    const topic = /Wechaty|BOT/i
    const weChatSet = new Set<string>()

    if (this.weChatBot?.isLoggedIn) {
      const roomList = await this.weChatBot.Room.findAll({ topic })
      for (const room of roomList) {
        const memberList = await room.memberAll()
        memberList.forEach(contact => weChatSet.add(contact.id))
      }
      if (weChatSet.size <= 0) {
        this.log.error('GetWeChatMembersCountHandler', 'getWeChatMemberIds() got 0 members')
      }
    } else {
      this.log.error('GetWeChatMembersCountHandler', 'getWeChatMemberIds() bot is not logged in yet')
    }

    return weChatSet
  }

}
