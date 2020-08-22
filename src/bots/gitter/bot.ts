import {
  Wechaty,
  log,
}             from 'wechaty'

import { PuppetGitter }  from 'wechaty-puppet-gitter'

import { pluginList }       from './plugins/mod'
import { vorpalPluginList } from './vorpals/mod'

function getGitter (name: string) {
  log.verbose('getWechaty', 'getGitter(%s)', name)

  const puppet = new PuppetGitter({
    token: process.env.WECHATY_PUPPET_GITTER_TOEKN,
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

export { getGitter }
