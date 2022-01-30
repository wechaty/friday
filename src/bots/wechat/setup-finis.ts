import finis        from 'finis'
import {
  Wechaty,
  log,
}                   from 'wechaty'

import {
  VERSION,
}                   from '../../config.js'
import { fridayConfig } from '../../config/deprecated.js'

const BOT_NAME = 'Friday.BOT'

const LOGIN_ANNOUNCEMENT  = `Der! I just got online!\n${BOT_NAME} v${VERSION}`
// const LOGOUT_ANNOUNCEMENT = `Der! I'm going to offline now, see you, bye!\BOT5 v${VERSION}`
const EXIT_ANNOUNCEMENT   = `Der! I'm going to exit now, see you, bye!\n${BOT_NAME} v${VERSION}`

let bot: undefined | Wechaty

export async function setupFinis (wechaty: Wechaty): Promise<void> {
  if (bot) {
    throw new Error('startFinis should only init once')
  }
  bot = wechaty

  bot.on('login',   wechaty.wrapAsync(async () => {
    const room = await wechaty.Room.find({ id: fridayConfig.wechat.chatops.bot5 })
    if (!room) {
      throw new Error('room id: ' + fridayConfig.wechat.chatops.bot5 + ' not found')
    }
    await room.say(LOGIN_ANNOUNCEMENT)
  }))
  bot.on('logout',  user => log.info('RestartReporter', 'startFinis() bot %s logout', user))
}

/**
 *
 * SIGTERM
 *
 */
let FINIS_QUITING = false

finis(async (code, signal) => {
  if (!bot) {
    log.warn('RestartReporter', 'finis() no bot set, exit')
    process.exit(1)
  }

  if (FINIS_QUITING) {
    log.warn('RestartReporter', 'finis(%s, %s) called again when quiting... hard exit', code, signal)
    process.exit(1)
  }

  FINIS_QUITING = true
  log.info('RestartReporter', 'finis(%s, %s)', code, signal)

  if (bot.isLoggedIn) {
    log.info('RestartReporter', 'finis() announce exiting')
    try {
      // log.level('silly')
      const room = await bot.Room.find({ id: fridayConfig.wechat.chatops.bot5 })
      if (!room) {
        throw new Error('room id: ' + fridayConfig.wechat.chatops.bot5 + ' not found')
      }
      await room.say(EXIT_ANNOUNCEMENT)
      log.info('startFinis', 'finis() chatops() done')
      await bot.say(EXIT_ANNOUNCEMENT)
      log.info('startFinis', 'finis() bot.say() done')
      await new Promise(resolve => setTimeout(resolve, 1 * 1000))
      log.info('startFinis', 'finis() sleep 10s done')
    } catch (e) {
      log.error('RestartReporter', 'finis() exception: %s', e)
    }
  } else {
    log.info('RestartReporter', 'finis() bot had been logout-ed')
  }

  setTimeout(() => {
    log.info('RestartReporter', 'finis() hard exit')
    setImmediate(() => process.exit(code))
  }, 5 * 1000)
  log.info('RestartReporter', 'finis() setTimeoutprocess.exit(), 5 * 1000)')

  try {
    log.info('RestartReporter', 'finis() setTimeout() going to exit with %d', code)
    await bot.stop()
  } catch (e) {
    log.error('RestartReporter', 'finis() setTimeout() exception: %s', e)
  } finally {
    log.info('RestartReporter', 'finis() soft exit')
    setImmediate(() => process.exit(code))
  }
})
