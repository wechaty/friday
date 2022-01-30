import {
  Injectable,
  OnModuleInit,
}                 from '@nestjs/common'
import { Brolog } from 'brolog'

import { Bot } from '../models/bot.model.js'

import {
  GitterBuilder,
  OABuilder,
  OicqBuilder,
  WeChatBuilder,
  WhatsappBuilder,
  WXWorkBuilder,
}                     from '../../bots/mod.js'

import type { FridaySetting } from '../../setting/friday-setting.js'

type FridayConfigInstance = InstanceType<typeof FridaySetting>
type FridayBotName = FridayConfigInstance[keyof FridayConfigInstance]['name']

@Injectable()
export class BotRepository implements OnModuleInit {

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

  async onModuleInit () {
    this.log.verbose('BotRepository', 'onModuleInit()')
    for (const bot of this.bots) {
      this.log.info('BotRepository', 'onModuleInit() bot.start() starting %s', bot.wechaty.name())
      await bot.wechaty.start()
      this.log.info('BotRepository', 'onModuleInit() bot.start() bot %s started', bot.wechaty.name())
    }
  }

  async find (name: FridayBotName): Promise<undefined | Bot> {
    return this.bots.filter(bot => bot.wechaty.name() === name)[0]
  }

  async findAll (): Promise<Bot[]> {
    return this.bots
  }

}
