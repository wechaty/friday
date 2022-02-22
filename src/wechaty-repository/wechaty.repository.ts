import {
  Injectable,
  OnModuleInit,
}                 from '@nestjs/common'
import { EventBus } from '@nestjs/cqrs'
import { Brolog } from 'brolog'
import type * as WECHATY from 'wechaty'

import { PuppetMessageReceivedEvent } from '../wechaty-events/mod.js'

import {
  GitterBuilder,
  OABuilder,
  QqBuilder,
  WeChatBuilder,
  WhatsAppBuilder,
  WXWorkBuilder,
}                     from './builders/mod.js'

import type { BotName } from '../wechaty-settings/mod.js'

@Injectable()
export class WechatyRepository implements OnModuleInit {

  private wechatyList: WECHATY.impls.WechatyInterface[]

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
    const builders = [
      gitterBuilder,
      oaBuilder,
      qqBuilder,
      wechatBuilder,
      whatsAppBuilder,
      wxworkBuilder,
    ]

    this.wechatyList = builders
      .filter(builder => builder.disabled === false)
      .map(Builder => Builder.build())
  }

  async onModuleInit () {
    this.log.verbose('BotRepository', 'onModuleInit()')

    for (const wechaty of this.wechatyList) {
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

      this.log.info('BotRepository', 'onModuleInit() bot.start() %s is starting ...', wechaty.name())
      await wechaty.start()
      this.log.info('BotRepository', 'onModuleInit() bot.start() %s is started', wechaty.name())
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
