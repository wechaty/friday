import './config'

import { log } from 'wechaty'

import { getFriday } from './wechaty/mod'
import { getBotList } from './bots/mod'

// import { setupWeb }   from './web/mod'

async function main () {
  log.verbose('main', 'main()')

  // const name = process.env.WECHATY_NAME || 'Friday.BOT'

  const botList = getBotList()

  for (const bot of botList) {
    await bot.start()
  }

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
