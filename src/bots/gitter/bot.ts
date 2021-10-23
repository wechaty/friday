import {
  WechatyBuilder,
  log,
}             from 'wechaty'

import { PuppetGitter }  from 'wechaty-puppet-gitter'

import { pluginList }       from './plugins/mod.js'
import { vorpalPluginList } from './vorpals/mod.js'

function getGitter (name: string) {
  log.verbose('getWechaty', 'getGitter(%s)', name)

  const puppet = new PuppetGitter({
    token: process.env['WECHATY_PUPPET_GITTER_TOKEN'],
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

export { getGitter }
