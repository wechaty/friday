import {
  WechatyBuilder,
  log,
}             from 'wechaty'

import { PuppetWhatsapp }  from 'wechaty-puppet-whatsapp'

import { pluginList }       from './plugins/mod.js'
import { vorpalPluginList } from './vorpals/mod.js'

function getWhatsapp (name: string) {
  log.verbose('getWechaty', 'getWhatsapp(%s)', name)

  const puppet = new PuppetWhatsapp()

  const bot = WechatyBuilder.build({
    name,
    puppet,
  })

  void pluginList
  void vorpalPluginList

  bot.use([
    ...pluginList,
    ...vorpalPluginList,
  ])

  return bot
}

export { getWhatsapp }
