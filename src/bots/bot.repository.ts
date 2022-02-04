import {
  Injectable,
  OnModuleInit,
}                 from '@nestjs/common'
import { Brolog } from 'brolog'

import { Bot } from '../cqrs/models/bot.model.js'

import {
  GitterBuilder,
  OABuilder,
  OicqBuilder,
  WeChatBuilder,
  WhatsappBuilder,
  WXWorkBuilder,
}                     from './mod.js'

@Injectable()
export class BotRepository implements OnModuleInit {

  private bots: Bot[]

  constructor (
    private log: Brolog,
    gitterBuilder   : GitterBuilder,
    oaBuilder       : OABuilder,
    oicqBuilder     : OicqBuilder,
    wechatBuilder   : WeChatBuilder,
    whatsappBuilder : WhatsappBuilder,
    wxworkBuilder   : WXWorkBuilder,
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

  async find (name: string): Promise<undefined | Bot> {
    return this.bots.filter(bot => bot.wechaty.name() === name)[0]
  }

  findByPuppetId (puppetId: string): undefined | Bot {
    return this.bots.filter(bot => bot.wechaty.puppet.id === puppetId)[0]
  }

  async findAll (): Promise<Bot[]> {
    return this.bots
  }

}
