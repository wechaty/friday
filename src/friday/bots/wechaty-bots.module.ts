/* eslint-disable sort-keys */
import {
  Module,
  Provider,
}             from '@nestjs/common'

import { GitterBuilder }    from './gitter/gitter-builder.js'
import { OABuilder }        from './oa/oa-builder.js'
import { OicqBuilder }      from './oicq/oicq-builder.js'
import { WeChatBuilder }    from './wechat/wechat-builder.js'
import { WhatsappBuilder }  from './whatsapp/whatsapp-builder.js'
import { WXWorkBuilder }    from './wxwork/wxwork-builder.js'

const providers: Provider[] = [
  GitterBuilder,
  OABuilder,
  OicqBuilder,
  WeChatBuilder,
  WhatsappBuilder,
  WXWorkBuilder,
]

@Module({
  providers,
  exports: providers,
})
export class WechatyBotsModule {}
