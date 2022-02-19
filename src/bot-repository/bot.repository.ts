import {
  Injectable,
  OnModuleInit,
}                 from '@nestjs/common'
import type { EventBus } from '@nestjs/cqrs'
import type { Logger } from 'brolog'
import type * as WECHATY from 'wechaty'

import { PuppetMessageReceivedEvent } from './events/mod.js'
import type { BotName } from '../bot-settings/mod.js'

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

  private wechatyList: WECHATY.impls.WechatyInterface[]

  constructor (
    private readonly log: Logger,
    private readonly eventBus: EventBus,
    gitterBuilder   : GitterBuilder,
    oaBuilder       : OABuilder,
    qqBuilder       : QqBuilder,
    wechatBuilder   : WeChatBuilder,
    whatsAppBuilder : WhatsAppBuilder,
    wxworkBuilder   : WXWorkBuilder,

  ) {
    this.wechatyList = [
      gitterBuilder.build(),
      oaBuilder.build(),
      qqBuilder.build(),
      wechatBuilder.build(),
      whatsAppBuilder.build(),
      wxworkBuilder.build(),
    ]
  }

  async onModuleInit () {
    this.log.verbose('BotRepository', 'onModuleInit()')
    for (const wechaty of this.wechatyList) {
      this.log.info('BotRepository', 'onModuleInit() bot.start() starting %s', wechaty.name())
      await wechaty.start()
      /**
       * Huan(202202): FIXME
       *  move this logic to a better place?
       */
      wechaty.on('message', message => this.eventBus.publish(
        new PuppetMessageReceivedEvent(
          message.wechaty.puppet.id,
          message.id,
        ),
      ))
      this.log.info('BotRepository', 'onModuleInit() bot.start() bot %s started', wechaty.name())
    }
  }

  find (name: BotName): undefined | WECHATY.impls.WechatyInterface {
    return this.wechatyList.filter(wechaty => wechaty.name() === name)[0]
  }

  findByPuppetId (puppetId: string): undefined | WECHATY.impls.WechatyInterface {
    return this.wechatyList.filter(wechaty => wechaty.puppet.id === puppetId)[0]
  }

  async findAll (): Promise<WECHATY.impls.WechatyInterface[]> {
    return this.wechatyList
  }

}
