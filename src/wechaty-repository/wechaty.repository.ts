import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
}                         from '@nestjs/common'
import { EventBus }       from '@nestjs/cqrs'
import { Brolog }         from 'brolog'
import type * as WECHATY  from 'wechaty'

/**
 * Huan(20220222) deep import for solve circular dependency temporary
 */
import {
  PuppetMessageReceivedEvent,
}                               from '../wechaty-events/events/impls/puppet-message-received.event.js'

import { getSetupFinis }        from '../infrastructure/mod.js'
import {
  type BotName,
  WeChatSettings,
}                               from '../wechaty-settings/mod.js'

import {
  GitterBuilder,
  OABuilder,
  QqBuilder,
  WeChatBuilder,
  WhatsAppBuilder,
  WXWorkBuilder,
}                     from './builders/mod.js'

@Injectable()
export class WechatyRepository implements OnModuleInit, OnModuleDestroy {

  private wechatyList: WECHATY.impls.WechatyInterface[]

  constructor (
    private readonly log: Brolog,
    private readonly eventBus: EventBus,
    private readonly weChatSettings: WeChatSettings,
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
    this.log.verbose('WechatyRepository', 'onModuleInit()')

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

      this.log.info('WechatyRepository', 'onModuleInit() bot.start() %s is starting ...', wechaty.name())
      await wechaty.start()
      this.log.info('WechatyRepository', 'onModuleInit() bot.start() %s is started', wechaty.name())
    }

    /**
     * Finis Hook
     */
    const weChatWechaty = this.findByName('WeChat')
    if (weChatWechaty) {
      const setupFinis = getSetupFinis(this.weChatSettings)
      await setupFinis(weChatWechaty)
    } else {
      this.log.warn('WechatyRepository', 'onModuleInit() no WeChat bot found')
    }

  }

  async onModuleDestroy () {
    this.log.verbose('WechatyRepository', 'onModuleDestroy()')

    for (const wechaty of this.wechatyList) {
      this.log.info('WechatyRepository', 'onModuleDestroy() bot.stop() %s is stopping ...', wechaty.name())
      await wechaty.stop()
      this.log.info('WechatyRepository', 'onModuleDestroy() bot.stop() %s is stopped', wechaty.name())
    }
  }

  findByName (name: BotName): undefined | WECHATY.impls.WechatyInterface {
    return this.wechatyList.filter(wechaty => wechaty.name() === name)[0]
  }

  findByPuppetId (puppetId: string): undefined | WECHATY.impls.WechatyInterface {
    return this.wechatyList.filter(wechaty => wechaty.puppet.id === puppetId)[0]
  }

  async findAll (): Promise<WECHATY.impls.WechatyInterface[]> {
    return this.wechatyList
  }

}
