import { Injectable } from '@nestjs/common'
import { Brolog } from 'brolog'

import { Bot } from '../models/bot.model.js'

import { getCeibs }   from '../bots/ceibs/bot.js'
import { getWxWork }  from '../bots/wxwork/wxwork-builder.js'
import { getHuanOa }  from '../bots/oa/oa-builder.js'
import { getGitter }  from '../bots/gitter/gitter-builder.js'
import { getQQ }      from '../bots/oicq/oicq-builder.js'
import { getWhatsapp } from '../bots/whatsapp/whatsapp-builder.js'
import { getFriday } from '../bots/wechat/wechat-builder.js'
import type { WechatyInterface } from 'wechaty/impls'

export enum BotName {
  Ceibs    = 'Ceibs',
  Gitter   = 'Gitter',
  HuanOa   = 'HuanOa',
  QQ       = 'QQ',
  WeChat   = 'WeChat',
  WhatsApp = 'WhatsApp',
  WxWork   = 'WxWork',
}

@Injectable()
export class BotRepository {

  bots: { [key in BotName]: Bot }

  constructor (
    public log: Brolog,
    public ceibsBot: CeibsBot,
    public gitterBot: GitterBot,
    public huanOaBot: HuanOaBot,
    public qqBot: QQBot,
    public wechatyBot: BotName,
    public whatsappBot: WhatsappBot,
    public wxworkBot: WxworkBot,
  ) {
    this.bots = {
      [CeibsBot.wechaty.name]    : new Bot(CeibsBot.wechaty),
      [BotName.Gitter]   : new Bot(GitterBot.wechaty),
      [BotName.HuanOa]   : new Bot(HuanOaBot.wechaty),
      [BotName.QQ]       : new Bot(QQBot.wechaty),
      [BotName.WeChat]   : new Bot(FridayBot.wechaty),
      [BotName.WhatsApp] : new Bot(WhatsappBot.wechaty),
      [BotName.WxWork]   : new Bot(WxWorkBot.wechaty),
    } as const
  }

  async find (name: BotName): Promise<Bot> {
    return this.bots[name]
  }

  async findAll (): Promise<Bot[]> {
    return Object.values(this.bots)
  }

}
