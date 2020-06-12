import {
  Wechaty,
  log,
}                 from 'wechaty'

import {
  getMemory,
}               from './get-memory'

let wechaty: Wechaty

export function getWechaty (name: string): Wechaty {
  log.verbose('getWechaty', 'getWechaty(%s)', name)

  if (wechaty) {
    return wechaty
  }

  const memory = getMemory(name)

  wechaty = new Wechaty({
    memory,
    name,
  })

  return wechaty
}
