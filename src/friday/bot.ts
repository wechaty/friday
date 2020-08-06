import {
  Wechaty,
  log,
}             from 'wechaty'

import { startWeb } from '../web/setup-web'
import { WEB_PORT } from '../config'

import { pluginList }       from './plugins/mod'
import { vorpalPluginList } from './vorpals/mod'

import { getMemory }  from './get-memory'
import { setupFinis } from './setup-finis'

export function getFriday (name: string): Wechaty {
  log.verbose('getWechaty', 'getFriday(%s)', name)

  const memory = getMemory(name)

  const wechaty = new Wechaty({
    memory,
    name,
  })

  /**
   * Initialize Plugins
   */
  wechaty.use(
    ...pluginList,
    ...vorpalPluginList,
  )

  /**
   * Setup Web
   */
  wechaty.on('start', async () => {
    const stopWeb = await startWeb(
      wechaty,
      WEB_PORT,
    )
    wechaty.once('stop', () => stopWeb())
  })

  /**
   * Finis Hook
   */
  setupFinis(wechaty)
    .catch(e => {
      log.error('getWechaty', 'setupFinis() rejection: %s', e)
    })

  return wechaty
}
