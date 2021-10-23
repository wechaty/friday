import {
  WechatyBuilder,
  log,
}             from 'wechaty'

import { PuppetOICQ }  from 'wechaty-puppet-oicq'

import { pluginList }       from './plugins/mod.js'
import { vorpalPluginList } from './vorpals/mod.js'

function getQQ (name: string) {
  log.verbose('getWechaty', 'getQQ(%s)', name)

  const qq = Number(process.env['WECHATY_PUPPET_OICQ_QQ'])
  const puppet = new PuppetOICQ({
    qq,
  })

  const bot = new WechatyBuilder().options({
    name,
    puppet,
  }).build()

  void pluginList
  void vorpalPluginList

  bot.use([
    ...pluginList,
    ...vorpalPluginList,
  ])

  return bot
}

export { getQQ }
