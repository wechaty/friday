import {
  WechatyBuilder,
  log,
}                   from 'wechaty'
import { PuppetOA }  from 'wechaty-puppet-official-account'

import { pluginList }       from './plugins/mod.js'
import { vorpalPluginList } from './vorpals/mod.js'

import { oaTestChatOps } from '../wxwork/bot.js'

function getHuanOa (name: string) {
  log.verbose('getWechaty', 'getHuanOa(%s)', name)

  const oa = new PuppetOA({
    appId           : process.env['HUAN_APP_ID'],
    appSecret       : process.env['HUAN_APP_SECRET'],
    token           : process.env['HUAN_TOKEN'],
    webhookProxyUrl : process.env['HUAN_WEBHOOK_PROXY_URL'],
  })

  const bot = WechatyBuilder.build({
    name,
    puppet: oa,
  })

  bot.use([
    ...pluginList,
    ...vorpalPluginList,
  ])

  bot.on('message', oaTestChatOps)

  return bot
}

export { getHuanOa }
