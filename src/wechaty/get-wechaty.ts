import {
  Wechaty,
  log,
}                 from 'wechaty'

import { pluginList } from '../plugins/mod'

import { getMemory }  from './get-memory'
import { setupFinis } from './setup-finis'

let wechaty: Wechaty

export function getWechaty (name: string): Wechaty {
  log.verbose('getWechaty', 'getWechaty(%s)', name)

  if (!wechaty) {
    const memory = getMemory(name)

    wechaty = new Wechaty({
      memory,
      name,
    })

    /**
     * Initialize Plugins
     */
    wechaty.use(pluginList)

    /**
     * Finis Hook
     */
    setupFinis(wechaty)
      .catch(e => {
        log.error('getWechaty', 'setupFinis() rejection: %s', e)
      })
  }

  return wechaty
}
