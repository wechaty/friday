import {
  Wechaty,
  log,
}                 from 'wechaty'

import { pluginList }       from '../plugins/mod'
import { vorpalPluginList } from '../vorpals/mod'
import { setupWeb }         from '../web/setup-web'

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
  let stopWeb: () => void
  wechaty.on('start', async () => { stopWeb = await setupWeb(wechaty) })
  wechaty.on('stop', () => stopWeb && stopWeb())

  /**
   * Finis Hook
   */
  setupFinis(wechaty)
    .catch(e => {
      log.error('getWechaty', 'setupFinis() rejection: %s', e)
    })

  return wechaty
}
