import { Injectable } from '@nestjs/common'
import { Brolog } from 'brolog'

import { Bot } from '../models/bot.model.js'

import {
  GitterBuilder,
  OABuilder,
  OicqBuilder,
  WeChatBuilder,
  WhatsappBuilder,
  WXWorkBuilder,
}                     from '../bots/mod.js'

import type { FridayConfig } from '../config/friday-config.js'

type FridayConfigInstance = InstanceType<typeof FridayConfig>
type FridayBotName = FridayConfigInstance[keyof FridayConfigInstance]['name']

@Injectable()
export class BotRepository {

  protected bots: Bot[]

  constructor (
    protected log: Brolog,
    protected gitterBuilder   : GitterBuilder,
    protected oaBuilder       : OABuilder,
    protected oicqBuilder     : OicqBuilder,
    protected wechatBuilder   : WeChatBuilder,
    protected whatsappBuilder : WhatsappBuilder,
    protected wxworkBuilder   : WXWorkBuilder,
  ) {
    this.bots = [
      new Bot(gitterBuilder.build()),
      new Bot(oaBuilder.build()),
      new Bot(oicqBuilder.build()),
      new Bot(wechatBuilder.build()),
      new Bot(whatsappBuilder.build()),
      new Bot(wxworkBuilder.build()),
    ]
  }

  async find (name: FridayBotName): Promise<undefined | Bot> {
    return this.bots.filter(bot => bot.wechaty.name() === name)[0]
  }

  async findAll (): Promise<Bot[]> {
    return this.bots
  }

}
