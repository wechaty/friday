import {
  Wechaty,
  log,
}                   from 'wechaty'
import { PuppetHostie }  from 'wechaty-puppet-hostie'

import { pluginList }       from './plugins/mod'
import { vorpalPluginList } from './vorpals/mod'

function getWxWork (name: string) {
  log.verbose('getWechaty', 'getWxWork(%s)', name)

  const puppet = new PuppetHostie({
    token: process.env.WECHATY_PUPPET_HOSTIE_TOKEN_WXWORK,
  })

  const bot = new Wechaty({
    name,
    puppet,
  })

  bot.use([
    ...pluginList,
    ...vorpalPluginList,
  ])

  return bot
}

export { getWxWork }
