import './config'

import { log } from 'wechaty'

import { getFriday }  from './friday/bot'
import { getBots } from './bots/mod'

import { connectGitterFriday } from './cross-puppet'
import { startStatusPageMetricUpdater } from './status-page/updater'

void getFriday

async function main () {
  log.verbose('main', 'main()')

  const friday = getFriday('friday')
  const bots   = getBots()

  const botList = [
    friday,
    ...Object.values(bots),
  ]

  const botFutureList = botList.map(async bot => {
    log.info('Friday', 'main() bot.start() starting %s', bot.name())
    await bot.start()
    log.info('Friday', 'main() bot.start() bot %s started', bot.name())
  })

  try {
    await Promise.all(botFutureList)
  } catch (e) {
    log.error('Friday', 'main() bot.start() rejection: %s', e)
  }

  const gitter = bots.gitter
  connectGitterFriday({ friday, gitter })

  startStatusPageMetricUpdater(friday)

  /**
   * Do not return until the bot turned off
   */
  await Promise.all(
    botList.map(
      bot => bot.state.ready('off')
    )
  )

  return 0
}

main()
  .then(process.exit)
  .catch((e) => {
    log.error('Main', 'main() rejection: %s', e)
    console.error(e)
    process.exit(1)
  })
