import { Injectable } from '@nestjs/common'
import { Brolog } from 'brolog'

import { Bot } from '../models/bot.model.js'

import { getCeibs }   from './bots/ceibs/bot.js'
import { getWxWork }  from './bots/wxwork/bot.js'
import { getHuanOa }  from './bots/huan-oa/bot.js'
import { getGitter }  from './bots/gitter/bot.js'
import { getQQ }      from './bots/qq/bot.js'
import { getWhatsapp } from './bots/whatsapp/bot.js'
import { getFriday } from './bots/friday/bot.js'
import type { WechatyInterface } from 'wechaty/impls'

export enum WechatyBot {
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

  bots: { [key in WechatyBot]: Bot }

  constructor (
    public log: Brolog,
    public roomConfig: RoomConfig
  ) {
    this.bots = {
      [WechatyBot.Ceibs]    : new Bot(getCeibs('Ceibs'), this.log),
      [WechatyBot.Gitter]   : new Bot(getGitter('Gitter'), this.log),
      [WechatyBot.HuanOa]   : new Bot(getHuanOa('HuanOa'), this.log),
      [WechatyBot.QQ]       : new Bot(getQQ('QQ'), this.log),
      [WechatyBot.WeChat]   : new Bot(getFriday('WeChat'), this.log),
      [WechatyBot.WhatsApp] : new Bot(getWhatsapp('WhatsApp'), this.log),
      [WechatyBot.WxWork]   : new Bot(getWxWork('WxWork'), this.log),
    } as const
  }

  async find (name: WechatyBot): Promise<Bot> {
    return this.bots[name]
  }

  async findAll (): Promise<Bot[]> {
    return Object.values(this.bots)
  }

}
