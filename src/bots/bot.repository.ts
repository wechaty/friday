import {
  Injectable,
  OnModuleInit,
}                 from '@nestjs/common'
import type { EventBus } from '@nestjs/cqrs'
import { Brolog } from 'brolog'

import { Bot } from '../cqrs/models/bot.model.js'
import { PuppetMessageReceivedEvent } from './events/mod.js'

import {
  GitterBuilder,
  OABuilder,
  QqBuilder,
  WeChatBuilder,
  WhatsAppBuilder,
  WXWorkBuilder,
}                     from './mod.js'

@Injectable()
export class BotRepository implements OnModuleInit {

  private bots: Bot[]

  constructor (
    private readonly log: Brolog,
    private readonly eventBus: EventBus,
    gitterBuilder   : GitterBuilder,
    oaBuilder       : OABuilder,
    qqBuilder       : QqBuilder,
    wechatBuilder   : WeChatBuilder,
    whatsAppBuilder : WhatsAppBuilder,
    wxworkBuilder   : WXWorkBuilder,

  ) {
    this.bots = [
      new Bot(gitterBuilder.build()),
      new Bot(oaBuilder.build()),
      new Bot(qqBuilder.build()),
      new Bot(wechatBuilder.build()),
      new Bot(whatsAppBuilder.build()),
      new Bot(wxworkBuilder.build()),
    ]
  }

  async onModuleInit () {
    this.log.verbose('BotRepository', 'onModuleInit()')
    for (const bot of this.bots) {
      this.log.info('BotRepository', 'onModuleInit() bot.start() starting %s', bot.wechaty.name())
      await bot.wechaty.start()
      /**
       * Huan(202202): FIXME
       *  move this logic to a better place?
       */
      bot.wechaty.on('message', message => this.eventBus.publish(
        new PuppetMessageReceivedEvent(
          message.wechaty.puppet.id,
          message.id,
        ),
      ))
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
