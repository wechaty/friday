import {
  Wechaty,
  log,
  Message,
}                   from 'wechaty'
import { PuppetHostie }  from 'wechaty-puppet-hostie'

import { startWeb }         from '../../web/mod'

import { pluginList }       from './plugins/mod'
import { vorpalPluginList } from './vorpals/mod'

let workBot: undefined | Wechaty

function getWxWork (name: string) {
  log.verbose('getWechaty', 'getWxWork(%s)', name)

  const puppet = new PuppetHostie({
    token: process.env.WECHATY_PUPPET_HOSTIE_TOKEN_WXWORK,
  })

  const bot = new Wechaty({
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

const oaTestChatOps = async (message: Message) => {
  if (!workBot) { return }

  const ROOM_ID = 'R:10696051746184005' // ChatOps - OA
  const room = workBot.Room.load(ROOM_ID)
  await room.say(message.toString())
}

export {
  getWxWork,
  oaTestChatOps,
}
