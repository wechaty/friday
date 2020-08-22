import {
  Wechaty,
  log,
  Message,
}             from 'wechaty'

import { startWeb } from '../web/setup-web'
import { WEB_PORT } from '../config'

import { pluginList }       from './plugins/mod'
import { vorpalPluginList } from './vorpals/mod'

import { getMemory }  from './get-memory'
import { setupFinis } from './setup-finis'

let bot: undefined | Wechaty

function getFriday (name: string): Wechaty {
  log.verbose('getWechaty', 'getFriday(%s)', name)

  const memory = getMemory(name)

  const wechaty = new Wechaty({
    memory,
    name,
  })

  void pluginList
  void vorpalPluginList

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

  bot = wechaty

  return wechaty
}

const ceibsChatOps = async (message: Message) => {
  if (!bot) { return }

  const ROOM_ID = '19537208917@chatroom'  // ChatOps - OA
  const room = bot.Room.load(ROOM_ID)
  await room.say(message.toString())
}

export {
  getFriday,
  ceibsChatOps,
}
