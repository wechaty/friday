import {
  Wechaty,
  log,
}                   from 'wechaty'
import { PuppetOA }  from 'wechaty-puppet-official-account'

import { pluginList }       from './plugins/mod'
import { vorpalPluginList } from './vorpals/mod'

function getHuanOa (name: string) {
  log.verbose('getWechaty', 'getHuanOa(%s)', name)

  const oa = new PuppetOA({
    appId           : process.env.HUAN_APP_ID,
    appSecret       : process.env.HUAN_APP_SECRET,
    token           : process.env.HUAN_TOKEN,
    webhookProxyUrl : process.env.HUAN_WEBHOOK_PROXY_URL,
  })

  const bot = new Wechaty({
    name,
    puppet: oa,
  })

  bot.use([
    ...pluginList,
    ...vorpalPluginList,
  ])

  return bot
}

export { getHuanOa }
