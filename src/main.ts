import { log } from 'wechaty'

/**
 * Load .env first
 */
import {
  VERSION,
  WEB_PORT,
}                                 from './config.js'

import { getBots }                from './bots/mod.js'
import * as WebManager            from './web/mod.js'
import {
  startStatusPageMetricUpdater,
}                                 from './status-page/mod.js'

import { getFriday }              from './friday/bot.js'

import {
  connectGitterFriday,
}                       from './cross-puppet.js'

void getFriday

async function main () {
  log.verbose('main', 'main() v%s', VERSION)

  const friday = getFriday('friday')
  const bots   = getBots()

  /**
   * Setup Web
   */
  WebManager.addWechaty(friday)
  if ('qq' in bots) {
    WebManager.addWechaty(bots.qq)
  }
  if ('whatsapp' in bots) {
    WebManager.addWechaty(bots.whatsapp)
  }

  /**
   * Workaround with https://github.com/padlocal/wechaty-puppet-padlocal/issues/116
   */
  const stopWeb = WebManager.startWeb(WEB_PORT)

  const botList = [
    friday,
    ...Object.values(bots),
  ]

  for (const bot of botList) {
    log.info('Friday', 'main() bot.start() starting %s', bot.name())
    await bot.start()
    log.info('Friday', 'main() bot.start() bot %s started', bot.name())
  }

  const gitter = bots.gitter
  const qq = bots.qq

  await connectGitterFriday({
    friday,
    gitter,
    qq,
  })

  startStatusPageMetricUpdater({
    friday,
    gitter: bots.gitter,
  })

  /**
   * Do not return until the bot turned off
   */
  await Promise.all(
    botList.map(
      bot => bot.state.stable('inactive'),
    ),
  )

  stopWeb()

  return 0
}

main()
  .then(process.exit)
  .catch((e) => {
    log.error('Main', 'main() rejection: %s', e)
    console.error(e)
    process.exit(1)
  })
