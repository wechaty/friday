import {
  Wechaty,
  log,
  Message,
}             from 'wechaty'

import { startWeb } from '../web/setup-web.js'
import { WEB_PORT } from '../config.js'

import { pluginList }       from './plugins/mod.js'
import { vorpalPluginList } from './vorpals/mod.js'

import { getMemory }   from './get-memory.js'
import { setupFinis }  from './setup-finis.js'
import { getIoClient } from './get-io-client.js'

let bot: undefined | Wechaty

function getFriday (name: string): Wechaty {
  log.verbose('getWechaty', 'getFriday(%s)', name)

  const memory = getMemory(name)

  const wechaty = new Wechaty({
    memory,
    name,
  })

  // void pluginList
  // void vorpalPluginList

  /**
   * Initialize Plugins
   */
  wechaty.use(
    ...pluginList,
    ...vorpalPluginList,
  )

  const ioClient = getIoClient(wechaty)

  /**
   * Setup Web
   */
  wechaty.on('start', async () => {
    /**
     * Web Hook
     */
    const stopWeb = await startWeb(
      wechaty,
      WEB_PORT,
    )
    wechaty.once('stop', () => stopWeb())
  })

  /**
   * Io Client Hook
   */
  wechaty.on('start', () => ioClient.start())
  wechaty.on('stop',  () => ioClient.stop())

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
