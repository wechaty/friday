import { log } from 'wechaty'

import { getWechaty } from './wechaty/mod'
import { setupWeb }   from './web/mod'

async function main () {
  log.verbose('main', 'main()')

  const name = process.env.WECHATY_NAME || 'Friday.BOT'

  const bot = getWechaty(name)

  await bot.start()
  await setupWeb(bot)

  /**
   * Do not return until the bot turned off
   */
  await bot.state.ready('off')

  return 0
}

main()
  .then(process.exit)
  .catch((e) => {
    log.error('Main', 'main() rejection: %s', e)
    process.exit(1)
  })
