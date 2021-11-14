import {
  WechatyBuilder,
  log,
}                   from 'wechaty'
import { PuppetOA }  from 'wechaty-puppet-official-account'

import { pluginList }       from './plugins/mod.js'
import { vorpalPluginList } from './vorpals/mod.js'

import { ceibsChatOps } from '../../friday/bot.js'

function getCeibs (name: string) {
  log.verbose('getWechaty', 'getCeibs(%s)', name)

  const oa = new PuppetOA({
    appId           : process.env['CEIBS_APP_ID'],
    appSecret       : process.env['CEIBS_APP_SECRET'],
    token           : process.env['CEIBS_TOKEN'],
    webhookProxyUrl : process.env['CEIBS_WEBHOOK_PROXY_URL'],
  })

  const bot = WechatyBuilder.build({
    name,
    puppet: oa,
  })

  bot.use([
    ...pluginList,
    ...vorpalPluginList,
  ])

  bot.on('message', ceibsChatOps)

  return bot
}

export { getCeibs }
