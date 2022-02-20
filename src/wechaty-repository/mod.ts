import { GitterBuilder }    from './gitter/gitter-builder.js'
import { OABuilder }        from './oa/oa-builder.js'
import { QqBuilder }      from './qq/qq-builder.js'
import { WeChatBuilder }    from './wechat/wechat-builder.js'
import { WhatsAppBuilder }  from './whatsapp/whatsapp-builder.js'
import { WXWorkBuilder }    from './wxwork/wxwork-builder.js'

import { WechatyRepository } from './wechaty.repository.js'

import {
  WechatyRepositoryModule,
}                       from './wechaty-repository.module.js'

export {
  WechatyRepositoryModule as WechatyBotsModule,
  WechatyRepository as BotRepository,
  //
  GitterBuilder,
  OABuilder,
  QqBuilder,
  WeChatBuilder,
  WhatsAppBuilder,
  WXWorkBuilder,
}
