import {
  Wechaty,
  WechatyBuilder,
  log,
  Message,
}                   from 'wechaty'
import { PuppetService }  from 'wechaty-puppet-service'

import { startWeb }         from '../../web/mod.js'

import { pluginList }       from './plugins/mod.js'
import { vorpalPluginList } from './vorpals/mod.js'

let workBot: undefined | Wechaty

function getWxWork (name: string) {
  log.verbose('getWechaty', 'getWxWork(%s)', name)

  const puppet = new PuppetService({
    token: process.env['WECHATY_PUPPET_SERVICE_TOKEN_WXWORK'],
  })

  const bot = WechatyBuilder.build({
    name,
    puppet,
  })

  bot.use([
    ...pluginList,
    ...vorpalPluginList,
  ])

  /**
   * Setup Web
   */
  bot.on('start', async () => {
    const stopWeb = await startWeb(
      bot,
      8789,
    )
    bot.once('stop', () => stopWeb())
  })

  workBot = bot
  return bot
}

/**
 * Huan(20201201): Wechaty Developers' Home 9
 *  R:10696051635011175
 */

const oaTestChatOps = async (message: Message) => {
  if (!workBot) { return }

  const ROOM_ID = 'R:10696051746184005' // ChatOps - OA
  const room = await workBot.Room.find({ id: ROOM_ID })
  if (!room) {
    throw new Error('Room id: ' + ROOM_ID + ' not found')
  }
  await room.say(message.toString())
}

export {
  getWxWork,
  oaTestChatOps,
}
